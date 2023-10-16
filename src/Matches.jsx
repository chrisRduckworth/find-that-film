function Matches({ matches }) {
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
          </li>
        );
      })}
    </ol>
  );
}

export default Matches;
