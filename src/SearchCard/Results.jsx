import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "./Results.css";

function Results({
  searchResults,
  setChosen,
  setSearchResults,
  setFinalCriteria,
}) {
  function handleClick(person) {
    setChosen(() => {
      const result = {};
      result[searchResults.category] = person;
      return result;
    });
    setFinalCriteria((currCriteria) => {
      const copyCriteria = JSON.parse(JSON.stringify(currCriteria));
      copyCriteria[searchResults.category + "s"].push(person.id);
      return copyCriteria;
    });
  }

  return (
    <>
      <h3 className="resultsHeader">Select one:</h3>
      {searchResults.people.length === 0 ? (
        <p>No results</p>
      ) : (
        <ListGroup className="personResults">
          {searchResults.people.map((person) => {
            return (
              <ListGroup.Item
                key={person.id}
                onClick={(e) => handleClick(person)}
                action
                variant="light"
              >
                <Stack direction="horizontal">
                  <Stack className="justify-content-between">
                    <h3>{person.name}</h3>
                    <p>{`${person.knownFor.title} (${person.knownFor.year})`}</p>
                  </Stack>
                  <img
                    src={person.img}
                    alt={`${person.name} portrait`}
                    style={{ height: "100px" }}
                  />
                </Stack>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
      <Stack direction="horizontal" gap={1} className="justify-content-center">
        <Button
          onClick={() => setSearchResults(undefined)}
          className="tryAgain"
          variant="secondary"
        >
          Try again
        </Button>
      </Stack>
    </>
  );
}

export default Results;
