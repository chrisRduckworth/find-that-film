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
      {chosen.genre && <p>Genre: {chosen.genre.name}</p>}
      {chosen.actor && (
        <>
          <p>Actor</p>
          <h3>{chosen.actor.name}</h3>
          <p>{`${chosen.actor.knownFor.title} (${chosen.actor.knownFor.year})`}</p>
          <img
            src={chosen.actor.img}
            alt={`${chosen.actor.name} portrait`}
            style={{ height: "100px" }}
          />
          <button onClick={() => setChosen(undefined)}>Change selection</button>
        </>
      )}
      {chosen.director && (
        <>
          <p>Director</p>
          <h3>{chosen.director.name}</h3>
          <p>{`${chosen.director.knownFor.title} (${chosen.director.knownFor.year})`}</p>
          <img
            src={chosen.director.img}
            alt={`${chosen.director.name} portrait`}
            style={{ height: "100px" }}
          />
          <button onClick={() => setChosen(undefined)}>Change selection</button>
        </>
      )}
      <button onClick={handleDelete}>del</button>
    </>
  );
}

export default Chosen;
