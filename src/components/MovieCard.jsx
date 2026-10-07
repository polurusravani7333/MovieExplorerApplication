import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="card h-100 shadow-sm">
      {movie.Poster !== "N/A" ? (
        <img
          src={movie.Poster}
          className="card-img-top"
          alt={movie.Title}
          style={{ height: "350px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-secondary text-white"
          style={{ height: "350px" }}
        >
          No Poster
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.Title}</h5>

        <p className="text-muted">
          {movie.Year} • {movie.Type}
        </p>

        <Link
          to={`/movie/${movie.imdbID}`}
          className="btn btn-outline-dark mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;