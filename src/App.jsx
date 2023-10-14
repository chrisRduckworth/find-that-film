import { useEffect } from "react";
import { useState } from "react";
import { getGenres } from "../utils/api";
import SearchCard from "./SearchCard/SearchCard";

function App() {
  const [genres, setGenres] = useState([]);
  const [finalCriteria, setFinalCriteria] = useState({
    actors: [],
    directors: [],
    genres: [],
  });
  const [searchCards, setSearchCards] = useState([0]);
  const [genreError, setGenreError] = useState(false);

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

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <main>
      <p>testing</p>
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
    </main>
  );
}

export default App;
