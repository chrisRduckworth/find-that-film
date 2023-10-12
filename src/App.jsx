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

  function addAnother() {
    setSearchCards((curr) => {
      const newId = Math.max(...curr) + 1
      return [...curr, newId]
    })
  }

  useEffect(() => {
    async function fetchGenres() {
      const genres = await getGenres()
      setGenres(genres)
    }
    fetchGenres()
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
      <button onClick={addAnother}>+ add another</button>
    </main>
  );
}

export default App;
