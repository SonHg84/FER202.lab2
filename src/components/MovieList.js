import MovieItem from './MovieItem';

function MovieList({ movies, favorites, onToggleFavorite, onShowDetails }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h3>Không tìm thấy phim</h3>
        <p>Thử tên phim khác hoặc chọn tất cả thể loại.</p>
      </div>
    );
  }

  return (
    <div className="movie-table-container">
      <table className="movie-list" aria-label="Danh sách phim">
        <thead>
          <tr><th scope="col">Title</th><th scope="col">Genre</th><th scope="col">Year</th><th scope="col">Rating</th></tr>
        </thead>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} isFavorite={favorites.includes(movie.id)} onToggleFavorite={onToggleFavorite} onShowDetails={onShowDetails} />
      ))}
      </table>
    </div>
  );
}

export default MovieList;
