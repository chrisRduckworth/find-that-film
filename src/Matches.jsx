import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import "./Matches.css";

function Matches({ matches }) {
  if (matches.length === 0) {
    return <p className="text-center">No films found</p>;
  }

  return (
    <ListGroup className="filmResults">
      {matches.map((match) => {
        return (
          <ListGroup.Item key={match.id}>
            <Stack direction="horizontal">
              <Stack className="justify-content-around">
                <h3>{`${match.title} (${match.year})`}</h3>
                <a
                  href={`https://www.themoviedb.org/movie/${match.id}`}
                  target="_blank"
                  className="tmdbLink"
                >
                  TMDB link
                </a>
              </Stack>
              <img
                src={match.poster}
                alt={`${match.title} poster`}
                style={{ height: "100px" }}
              />
            </Stack>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default Matches;
