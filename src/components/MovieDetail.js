import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ThemeContext } from '../context/ThemeContext';

function MovieDetail({ movie, onClose }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Modal
      show={Boolean(movie)}
      onHide={onClose}
      centered
      className="movie-detail"
      data-bs-theme={darkMode ? 'dark' : 'light'}
      aria-labelledby="movie-detail-title"
    >
      <Modal.Header>
        <Modal.Title id="movie-detail-title">Movie detail</Modal.Title>
      </Modal.Header>
      {movie && (
        <Modal.Body>
          <dl className="movie-detail-fields">


            <dt>title</dt>
            <dd>{movie.title}</dd>

            <dt>genre</dt>
            <dd>{movie.genre}</dd>

            <dt>year</dt>
            <dd>{movie.year}</dd>

            <dt>rating</dt>
            <dd>{movie.rating}</dd>

            <dt>director</dt>
            <dd>{movie.director}</dd>

            <dt>duration</dt>
            <dd>{movie.duration} minutes</dd>

            <dt></dt>
            <dd></dd>
            <dt>description</dt>
            <dd>{movie.description}</dd>
          </dl>
        </Modal.Body>
      )}
      <Modal.Footer>
        <button type="button" className="close-button" onClick={onClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieDetail;
