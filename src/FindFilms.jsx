import { useEffect } from "react";
import { useState } from "react";
import { getFilms, getGenres } from "../utils/api";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import SearchCard from "./SearchCard/SearchCard";
import Matches from "./Matches";
import "./FindFilms.css";
import "./App.css";
import Spinner from "react-bootstrap/Spinner";

function FindFilms() {
  const [genres, setGenres] = useState([]);
  const [finalCriteria, setFinalCriteria] = useState({
    actors: [],
    directors: [],
    genres: [],
  });
  const [searchCards, setSearchCards] = useState([Date.now()]);
  const [genreError, setGenreError] = useState(false);
  const [matches, setMatches] = useState(undefined);
  const [filmError, setFilmError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function addAnother() {
    setSearchCards((curr) => [...curr, Date.now()]);
  }

  function handleRestart() {
    window.scrollTo(0, 0);
    setSearchCards([0]);
    setMatches(undefined);
    setFinalCriteria({
      actors: [],
      directors: [],
      genres: [],
    });
  }

  async function fetchGenres() {
    setGenreError(false);
    try {
      const genres = await getGenres();
      setGenres(genres);
    } catch {
      setGenreError(true);
    }
  }

  async function findMatches() {
    setFilmError(false);
    setIsLoading(true);
    try {
      const films = await getFilms(finalCriteria);
      setMatches(films);
    } catch {
      setFilmError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGenres();
  }, []);

  return (
    <main>
      <section className="instructions">
        <p>
          To add an actor or director, select "Actor" or "Director" from the
          dropdown. Then type in the name and click submit. Then{" "}
          <strong>click one of the results.</strong>
        </p>
        <p>
          To add a genre, select "Genre" from the dropdown menu. Then choose a
          genre from the dropdown, and <strong>click Submit.</strong>
        </p>
        <p>
          To add extra criteria, click Add Another. To remove a criteria you
          have chosen, click Delete.
        </p>
        <p>
          Click "Find Films" to find the films which match all your criteria!
        </p>
      </section>
      {matches ? (
        <>
          <Matches matches={matches} />
          <Button className="startAgain" onClick={handleRestart}>
            Start Again
          </Button>
        </>
      ) : (
        <>
          {searchCards.map((id) => {
            return (
              <section key={id}>
                <SearchCard
                  genres={genres}
                  setFinalCriteria={setFinalCriteria}
                  id={id}
                  setSearchCards={setSearchCards}
                />
              </section>
            );
          })}
          {genreError && (
            <>
              <p>Error finding genres</p>
              <button onClick={fetchGenres}>Retry</button>
            </>
          )}
          {filmError && (
            <>
              <p>Error finding films</p>
              <button onClick={findMatches}>Retry</button>
            </>
          )}
          <Stack className="align-items-center findFilmsButtons" gap={3}>
            <Button onClick={addAnother}>Add another</Button>
            <Button onClick={findMatches} disabled={isLoading}>
              Find films
            </Button>
            {isLoading && (
              <Spinner role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Stack>
        </>
      )}
      <div className="aboutLinkContainer">
        <Link to="/about" className="aboutLink">
          About
        </Link>
      </div>
    </main>
  );
}

export default FindFilms;
