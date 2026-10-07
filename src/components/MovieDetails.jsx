function MovieDetails({ movie }) {
  return (
    <div className="row">
      <div className="col-md-4 text-center">
        {movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="img-fluid rounded"
            style={{ maxHeight: "550px" }}
          />
        ) : (
          <div className="bg-secondary text-white p-5 rounded">
            No Poster Available
          </div>
        )}
      </div>

      <div className="col-md-8 mt-4 mt-md-0">
        <h1 className="fw-bold">{movie.Title}</h1>

        <p className="text-muted">
          {movie.Year} • {movie.Runtime} • {movie.Genre}
        </p>

        <div className="mb-3">
          <span className="badge bg-warning text-dark fs-6">
            ⭐ {movie.imdbRating}
          </span>
        </div>

        <h5>Plot</h5>
        <p>{movie.Plot}</p>

        <hr />

        <p>
          <strong>Director:</strong> {movie.Director}
        </p>

        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>

        <p>
          <strong>Language:</strong> {movie.Language}
        </p>

        <p>
          <strong>Country:</strong> {movie.Country}
        </p>

        <p>
          <strong>Released:</strong> {movie.Released}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;