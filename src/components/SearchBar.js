function SearchBar({ search, onSearchChange }) {
  return (
    <div className="search-field">
      <label className="visually-hidden" htmlFor="movie-search">Tìm tên phim</label>
      <input id="movie-search" type="search" placeholder="Tìm tên phim..." value={search} onChange={(event) => onSearchChange(event.target.value)} />
    </div>
  );
}

export default SearchBar;
