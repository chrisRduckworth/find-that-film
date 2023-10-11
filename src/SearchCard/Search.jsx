import { useState } from "react";
import { getPeople } from "../../utils/api";

function Search({ genres, setSearchResults, setChosen, setFinalCriteria }) {
  const [category, setCategory] = useState("actor");
  const [searchText, setSearchText] = useState("");
  const [genreSelect, setGenreSelect] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    if (category === "genre") {
      if (genreSelect === "") {
        setIsInvalid(true);
      } else {
        setFinalCriteria((currCriteria) => {
          const copyCriteria = JSON.parse(JSON.stringify(currCriteria));
          copyCriteria.genres.push(genreSelect);
          return copyCriteria;
        });
        const chosenGenre = genres.find(
          (genre) => genre.id === parseInt(genreSelect)
        );
        setChosen({ genre: chosenGenre.name });
      }
    } else {
      if (searchText === "") {
        setIsInvalid(true);
      } else {
        const people = await getPeople(searchText)
        setSearchResults(people)
      }
    }
  }

  return (
    <form>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="category"
      >
        <option value="actor">Actor</option>
        <option value="director">Director</option>
        <option value="genre">Genre</option>
      </select>
      {category === "genre" ? (
        <select
          value={genreSelect}
          onChange={(e) => setGenreSelect(e.target.value)}
          aria-label="genre-list"
        >
          <option value="">-- Select One --</option>
          {genres.map((genre) => {
            return (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      <button onClick={handleSearch}>Submit</button>
      {isInvalid && <p>Invalid input</p>}
    </form>
  );
}

export default Search;
