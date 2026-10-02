import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';

function MovieItem({ movie, isFavorite, onToggleFavorite, onShowDetails }) {
  return (
    <tbody className="movie-item">
      <tr className="movie-info-row">
        <th scope="row">
          <button type="button" className="movie-title" aria-label={`Xem chi tiết ${movie.title}`} onClick={() => onShowDetails(movie)}>
            {isFavorite ? <FaStar /> : <CiStar />}
            <strong>{movie.title}</strong>
          </button>
        </th>
        <td>{movie.genre}</td>
        <td>{movie.year}</td>
        <td className="movie-rating"><span aria-hidden="true">★ </span>{movie.rating.toFixed(1)}</td>
      </tr>
      <tr className="movie-actions-row">
        <td colSpan={4}>
          <div className="movie-actions">
            <button
              type="button"
              className="favorite-button"
              aria-label={`${isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'} ${movie.title}`}
              aria-pressed={isFavorite}
              onClick={() => onToggleFavorite(movie.id)}
            >{isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}</button>
            <button type="button" className="detail-button" aria-label={`Movie detail: ${movie.title}`} onClick={() => onShowDetails(movie)}>Chi tiết</button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default MovieItem;
