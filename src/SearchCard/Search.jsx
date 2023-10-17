import { useState } from "react";
import { getPeople } from "../../utils/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import "./Search.css";

function Search({ genres, setSearchResults, setChosen, setFinalCriteria }) {
  const [category, setCategory] = useState("actor");
  const [searchText, setSearchText] = useState("");
  const [genreSelect, setGenreSelect] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchError, setSearchError] = useState(false);

  async function handleSearch(event) {
    setSearchError(false);
    setIsInvalid(false);
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
        setChosen({ genre: chosenGenre });
      }
    } else {
      if (searchText === "") {
        setIsInvalid(true);
      } else {
        try {
          const people = await getPeople(searchText);
          setSearchResults({ people, category });
        } catch {
          setSearchError(true);
        }
      }
    }
  }

  return (
    <Form className="searchForm" onSubmit={handleSearch}>
      <Stack gap={2}>
        <Stack direction="horizontal" gap={3}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="category"
            style={{ width: "max-content" }}
          >
            <option value="actor">Actor</option>
            <option value="director">Director</option>
            <option value="genre">Genre</option>
          </Form.Select>
          {isInvalid && <Badge bg="danger">Invalid input</Badge>}
          {searchError && <Badge>Error searching</Badge>}
        </Stack>
        <Stack direction="horizontal" gap={2}>
          {category === "genre" ? (
            <Form.Select
              value={genreSelect}
              onChange={(e) => setGenreSelect(parseInt(e.target.value))}
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
            </Form.Select>
          ) : (
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
          <Button type="submit">Submit</Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default Search;
