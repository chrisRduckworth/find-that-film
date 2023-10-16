function Matches({ matches }) {
  if (matches.length === 0) {
    return <p>No films found</p>;
  }

  return (
    <ol>
      {matches.map((match) => {
        return (
          <li key={match.id}>
            <h3>{`${match.title} (${match.year})`}</h3>
            <img
              src={match.poster}
              alt={`${match.title} poster`}
              style={{ height: "100px" }}
            />
            <a href={`https://www.themoviedb.org/movie/${match.id}`} target="_blank">
              More info
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default Matches;
