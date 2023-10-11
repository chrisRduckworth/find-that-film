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
  useEffect(() => {
    getGenres().then((genres) => setGenres(genres));
  }, []);

  return (
    <main>
      <p>testing</p>
      <SearchCard genres={genres} setFinalCriteria={setFinalCriteria} />
      <button>+ add another</button>
    </main>
  );
}

export default App;
