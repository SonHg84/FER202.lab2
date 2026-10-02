import { useContext, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { movies } from './data/movies';
import './App.css';

const genres = [...new Set(movies.map((movie) => movie.genre))];

function MovieManager() {
  const { darkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [sort, setSort] = useState('default');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedIds = JSON.parse(window.localStorage.getItem('movie_favorite') || '[]');
      if (Array.isArray(savedIds)) {
        setFavorites([...new Set(savedIds.filter((id) => movies.some((movie) => movie.id === id)))]);
      }
    } catch {
      // Start with no favorites if storage is unavailable or contains invalid JSON.
    }
    setFavoritesLoaded(true);
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      window.localStorage.setItem('movie_favorite', JSON.stringify(favorites));
    } catch {
      // Favorites still work in memory when storage is unavailable.
    }
  }, [favorites, favoritesLoaded]);

  const visibleMovies = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase('vi');
    const result = movies.filter((movie) =>
      movie.title.toLocaleLowerCase('vi').includes(keyword) &&
      (genre === 'all' || movie.genre === genre)
    );
    switch (sort) {
      case 'rating-desc': return result.sort((a, b) => b.rating - a.rating);
      case 'rating-asc': return result.sort((a, b) => a.rating - b.rating);
      default: return result;
    }
  }, [search, genre, sort]);

  function toggleFavorite(id) {
    setFavorites((ids) => ids.includes(id) ? ids.filter((favoriteId) => favoriteId !== id) : [...ids, id]);
  }

  return (
    <div className="app" data-theme={darkMode ? 'dark' : 'light'}>
      <main className="movie-manager">
        <Header />
        <div className="movie-tools">
          <SearchBar search={search} onSearchChange={setSearch} />
          <div className="filter-row">
            <GenreFilter genres={genres} genre={genre} onGenreChange={setGenre} />
            <div className="sort-field">
              <label className="visually-hidden" htmlFor="movie-sort">Sắp xếp</label>
              <select id="movie-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="rating-desc">Rating: high → low</option>
                <option value="rating-asc">Rating: low → high</option>
              </select>
            </div>
          </div>
        </div>
        <div className="statistics" role="status" aria-label="Thống kê phim">
          <div><span>Tổng: </span><strong>{movies.length}</strong></div>
          <div><span>Yêu thích: </span><strong>{favorites.length}</strong></div>
          <div><span>Đang hiển thị: </span><strong>{visibleMovies.length}</strong></div>
        </div>
        <section aria-labelledby="movies-heading">
          <h2 id="movies-heading" className="visually-hidden">Danh sách phim</h2>
          <MovieList movies={visibleMovies} favorites={favorites} onToggleFavorite={toggleFavorite} onShowDetails={setSelectedMovie} />
        </section>
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      </main>
    </div>
  );
}

function App() {
  return <ThemeProvider><MovieManager /></ThemeProvider>;
}

export default App;
