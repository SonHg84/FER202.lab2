import { StrictMode } from 'react';
import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import App from './App';
import { movies } from './data/movies';

beforeEach(() => window.localStorage.clear());

function movieRows() {
  return screen.getAllByRole('row').filter((row) => within(row).queryByRole('button', { name: /^Xem chi tiết / }));
}

test('shows actual movie data and combines title search with genre filtering', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Mini Movie Manager' })).toBeInTheDocument();
  expect(movieRows()).toHaveLength(6);
  expect(movieRows()[0]).toHaveTextContent('2014');
  expect(movieRows()[0]).toHaveTextContent('★ 8.7');
  fireEvent.change(screen.getByLabelText('Tìm tên phim'), { target: { value: '  THE  ' } });
  expect(movieRows()).toHaveLength(2);
  fireEvent.change(screen.getByLabelText('Thể loại'), { target: { value: 'Action' } });
  expect(movieRows()).toHaveLength(1);
  expect(screen.getByRole('status')).toHaveTextContent('Tổng: 6Yêu thích: 0Đang hiển thị: 1');
  fireEvent.change(screen.getByLabelText('Tìm tên phim'), { target: { value: 'unknown' } });
  expect(screen.getByText('Không tìm thấy phim')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Đang hiển thị: 0');
  fireEvent.change(screen.getByLabelText('Thể loại'), { target: { value: 'all' } });
  fireEvent.change(screen.getByLabelText('Tìm tên phim'), { target: { value: 'Christopher Nolan' } });
  expect(screen.getByText('Không tìm thấy phim')).toBeInTheDocument();
});

test('sorts rating in both directions and restores the default data order', () => {
  render(<App />);
  const sort = screen.getByLabelText('Sắp xếp');
  fireEvent.change(sort, { target: { value: 'rating-desc' } });
  expect(movieRows()[0]).toHaveTextContent('The Dark Knight');
  expect(movieRows()[5]).toHaveTextContent('The Grand Budapest Hotel');
  fireEvent.change(sort, { target: { value: 'rating-asc' } });
  expect(movieRows()[0]).toHaveTextContent('The Grand Budapest Hotel');
  expect(movieRows()[5]).toHaveTextContent('The Dark Knight');
  fireEvent.change(sort, { target: { value: 'default' } });
  movieRows().forEach((row, index) => expect(row).toHaveTextContent(movies[index].title));
});

test('persists favorites and counts them independently of visible movies', () => {
  const { unmount } = render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Yêu thích Interstellar' }));
  expect(screen.getByRole('button', { name: 'Bỏ yêu thích Interstellar' })).toHaveAttribute('aria-pressed', 'true');
  expect(JSON.parse(window.localStorage.getItem('movie_favorite'))).toEqual([1]);
  fireEvent.change(screen.getByLabelText('Thể loại'), { target: { value: 'Drama' } });
  expect(screen.getByRole('status')).toHaveTextContent('Yêu thích: 1Đang hiển thị: 1');
  unmount();
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Bỏ yêu thích Interstellar' }));
  expect(screen.getByRole('status')).toHaveTextContent('Yêu thích: 0');
});

test('loads stored favorite IDs without overwriting them during Strict Mode startup', () => {
  window.localStorage.setItem('movie_favorite', JSON.stringify([1, 4, 4, 999, '2', null]));
  const write = jest.spyOn(Storage.prototype, 'setItem');
  try {
    render(<StrictMode><App /></StrictMode>);
    expect(screen.getByRole('button', { name: 'Bỏ yêu thích Interstellar' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Bỏ yêu thích Parasite' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Yêu thích: 2');
    expect(window.localStorage.getItem('movie_favorite')).toBe('[1,4]');
    expect(write.mock.calls.filter(([key]) => key === 'movie_favorite')).toEqual([['movie_favorite', '[1,4]']]);
  } finally {
    write.mockRestore();
  }
});

test.each(['invalid JSON', '{"id":1}'])('handles invalid favorite storage: %s', (savedValue) => {
  window.localStorage.setItem('movie_favorite', savedValue);
  render(<App />);
  expect(screen.getByRole('status')).toHaveTextContent('Yêu thích: 0');
  fireEvent.click(screen.getByRole('button', { name: 'Yêu thích Interstellar' }));
  expect(window.localStorage.getItem('movie_favorite')).toBe('[1]');
});

test('opens every data field in the modal, closes it, and restores focus', async () => {
  render(<App />);
  const trigger = screen.getByRole('button', { name: 'Movie detail: Interstellar' });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = await screen.findByRole('dialog', { name: 'Movie detail' });
  expect(dialog.querySelectorAll('dt')).toHaveLength(8);
  for (const [field, value] of Object.entries(movies[0])) {
    expect(within(dialog).getByText(field, { exact: true })).toBeInTheDocument();
    expect(within(dialog).getByText(String(value), { exact: true })).toBeInTheDocument();
  }
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: 'Xem chi tiết Parasite' }));
  const nextDialog = await screen.findByRole('dialog');
  expect(within(nextDialog).getByText('Bong Joon-ho')).toBeInTheDocument();
  fireEvent.keyDown(nextDialog, { key: 'Escape', code: 'Escape', keyCode: 27 });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('persists the theme and applies it to movie details', async () => {
  const { container, unmount } = render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Chuyển sang giao diện tối' }));
  expect(container.querySelector('.app')).toHaveAttribute('data-theme', 'dark');
  unmount();
  render(<App />);
  expect(screen.getByRole('button', { name: 'Chuyển sang giao diện sáng' })).toHaveTextContent('Light');
  fireEvent.click(screen.getByRole('button', { name: 'Xem chi tiết Interstellar' }));
  expect(await screen.findByRole('dialog')).toHaveAttribute('data-bs-theme', 'dark');
});
