import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./Chosen.css";

function Chosen({ chosen, id, setSearchCards, setFinalCriteria, setChosen }) {
  function handleDelete() {
    setSearchCards((currCards) => {
      return currCards.filter((card) => card !== id);
    });
    setFinalCriteria((currCriteria) => {
      const copyCriteria = JSON.parse(JSON.stringify(currCriteria));
      if (chosen.genre) {
        copyCriteria.genres = copyCriteria.genres.filter(
          (genre) => genre !== chosen.genre.id
        );
      } else if (chosen.actor) {
        copyCriteria.actors = copyCriteria.actors.filter(
          (actor) => actor !== chosen.actor.id
        );
      } else if (chosen.director) {
        copyCriteria.directors = copyCriteria.directors.filter(
          (director) => director !== chosen.director.id
        );
      }
      return copyCriteria;
    });
  }

  return (
    <>
      <Stack>
        {chosen.genre && (
          <>
            <h3 className="chosenType">Genre</h3>
            <h3 className="chosenGenre">{chosen.genre.name}</h3>
          </>
        )}
        {chosen.actor && (
          <>
            <h3 className="chosenType">Actor</h3>
            <Stack direction="horizontal" className="chosenPersonCard">
              <Stack className="justify-content-between">
                <h3>{chosen.actor.name}</h3>
                <p>{`${chosen.actor.knownFor.title} (${chosen.actor.knownFor.year})`}</p>
              </Stack>
              <img
                src={chosen.actor.img}
                alt={`${chosen.actor.name} portrait`}
                style={{ height: "100px" }}
              />
            </Stack>
          </>
        )}
        {chosen.director && (
          <>
            <h3 className="chosenType">Director</h3>
            <Stack direction="horizontal" className="chosenPersonCard">
              <Stack className="justify-content-between">
                <h3>{chosen.director.name}</h3>
                <p>{`${chosen.director.knownFor.title} (${chosen.director.knownFor.year})`}</p>
              </Stack>
              <img
                src={chosen.director.img}
                alt={`${chosen.director.name} portrait`}
                style={{ height: "100px" }}
              />
            </Stack>
          </>
        )}
      </Stack>
      <Stack direction="horizontal" className="justify-content-center">
        <ButtonGroup>
          {(chosen.director || chosen.actor) && (
            <Button variant="secondary" onClick={() => setChosen(undefined)}>
              Change selection
            </Button>
          )}
          <Button variant="danger" onClick={handleDelete} className="delButton">
            Delete
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
}

export default Chosen;
