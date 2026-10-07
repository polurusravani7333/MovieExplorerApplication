import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");

  const searchMovies = async () => {
    if (!search.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=thewdb&s=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found.");
      }

      setMovies(data.Search || []);
    } catch (error) {
      setError(error.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies =
    category === "All"
      ? movies
      : movies.filter(
          (movie) =>
            movie.Type &&
            movie.Type.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">
            🎬 Movie Explorer
          </Link>
        </div>
      </nav>

      <main className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Movie Explorer</h1>
          <p className="text-muted">
            Search and explore your favorite movies.
          </p>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={searchMovies}
        />

        <div className="text-center mb-4">
          <button
            className={`btn me-2 ${
              category === "All" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className={`btn me-2 ${
              category === "Movie" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setCategory("Movie")}
          >
            Movies
          </button>

          <button
            className={`btn ${
              category === "Series" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setCategory("Series")}
          >
            Series
          </button>
        </div>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-dark"></div>
            <p className="mt-2">Loading movies...</p>
          </div>
        )}

        {error && !loading && (
          <div className="alert alert-danger text-center">
            ❌ {error}
          </div>
        )}

        {!loading && filteredMovies.length > 0 && (
          <div className="row g-4">
            {filteredMovies.map((movie) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3"
                key={movie.imdbID}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center text-muted mt-5">
            <h4>🎥 Search for a movie to get started</h4>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;