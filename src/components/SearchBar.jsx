function SearchBar({ search, setSearch, onSearch }) {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col-md-8">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearch();
              }
            }}
          />

          <button
            className="btn btn-dark"
            onClick={onSearch}
          >
            🔍 Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;