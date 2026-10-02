function GenreFilter({ genres, genre, onGenreChange }) {
  return (
    <div className="filter-field">
      <label className="visually-hidden" htmlFor="movie-genre">Thể loại</label>
      <select id="movie-genre" value={genre} onChange={(event) => onGenreChange(event.target.value)}>
        <option value="all">Tất cả thể loại</option>
        {genres.map((name) => <option key={name} value={name}>{name}</option>)}
      </select>
    </div>
  );
}

export default GenreFilter;
