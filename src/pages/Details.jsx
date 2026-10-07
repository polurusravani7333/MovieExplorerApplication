import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

function Details() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=thewdb&i=${id}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Movie details not found.");
        }

        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-dark"></div>
        <p className="mt-2">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          ❌ {error}
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-dark">
            ← Back to Movies
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <MovieDetails movie={movie} />

            <div className="text-center">
              <Link to="/" className="btn btn-dark mt-4">
                ← Back to Movies
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Details;