import { useEffect } from "react";
import { useState } from "react";
import { getFilms, getGenres } from "../utils/api";
import SearchCard from "./SearchCard/SearchCard";
import Matches from "./Matches";

function FindFilms () {
  const [genres, setGenres] = useState([]);
  const [finalCriteria, setFinalCriteria] = useState({
    actors: [],
    directors: [],
    genres: [],
  });
  const [searchCards, setSearchCards] = useState([0]);
  const [genreError, setGenreError] = useState(false);
  const [matches, setMatches] = useState(undefined);

  function addAnother() {
    setSearchCards((curr) => {
      const newId = Math.max(...curr) + 1;
      return [...curr, newId];
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
    const films =  await getFilms(finalCriteria);
    setMatches(films);
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <main>
      {matches ? (
        <>
          <Matches matches={matches} />
          <button onClick={() => setMatches(undefined)}>Retry</button>
          <button>Start Again</button>
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
              <button onClick={() => fetchGenres()}>Retry</button>
            </>
          )}
          <button onClick={addAnother}>+ add another</button>
          <button onClick={findMatches}>Find films</button>
        </>
      )}
    </main>
  );
}

export default FindFilms