import { useEffect } from "react";
import { useState } from "react";
import { getFilms, getGenres } from "../utils/api";
import SearchCard from "./SearchCard/SearchCard";
import Matches from "./Matches";

function FindFilms() {
  const [genres, setGenres] = useState([]);
  const [finalCriteria, setFinalCriteria] = useState({
    actors: [],
    directors: [],
    genres: [],
  });
  const [searchCards, setSearchCards] = useState([0]);
  const [genreError, setGenreError] = useState(false);
  const [matches, setMatches] = useState(undefined);
  const [filmError, setFilmError] = useState(false);

  function addAnother() {
    setSearchCards((curr) => {
      const newId = Math.max(...curr) + 1;
      return [...curr, newId];
    });
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
    fetchGenres();
  }, []);

  return (
    <main>
      {matches ? (
        <>
          <Matches matches={matches} />
          <button onClick={handleRestart}>Start Again</button>
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
          <button onClick={addAnother}>+ add another</button>
          <button onClick={findMatches}>Find films</button>
        </>
      )}
    </main>
  );
}

export default FindFilms;
