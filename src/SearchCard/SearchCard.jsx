import { useState } from "react";
import Search from "./Search"
import Chosen from "./Chosen";
import Results from "./Results";

function SearchCard({ genres, setFinalCriteria }) {
  const [searchResults, setSearchResults] = useState(undefined)
  const [chosen, setChosen] = useState(undefined)

  if (chosen) {
    return (
      <Chosen chosen={chosen} setChosen={setChosen}/>
    )
  }

  if (searchResults) {
    return (
      <Results searchResults={searchResults} setChosen={setChosen} setSearchResults={setSearchResults}/>
    )
  }

  return (
    <Search genres={genres} setSearchResults={setSearchResults} setChosen={setChosen} setFinalCriteria={setFinalCriteria}/>
  );
}

export default SearchCard;
