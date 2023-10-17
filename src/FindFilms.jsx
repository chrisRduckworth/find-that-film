import { useEffect } from "react";
import { useState } from "react";
import { getFilms, getGenres } from "../utils/api";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import SearchCard from "./SearchCard/SearchCard";
import Matches from "./Matches";
import "./FindFilms.css";

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

  function addAnother() {
    setSearchCards((curr) => [...curr, Date.now()]);
  }

  function handleRestart() {
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
    try {
      const films = await getFilms(finalCriteria);
      setMatches(films);
    } catch {
      setFilmError(true);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGenres();
  }, []);

  return (
    <main>
      {matches ? (
        <Stack className="align-items-center">
          <Matches matches={matches} />
          <Button className="startAgain" onClick={handleRestart}>
            Start Again
          </Button>
        </Stack>
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
          <Stack className="align-items-center findFilmsButtons" gap={4}>
            <Button onClick={addAnother}>Add Another</Button>
            <Button onClick={findMatches}>Find films</Button>
          </Stack>
        </>
      )}
    </main>
  );
}

export default FindFilms;
