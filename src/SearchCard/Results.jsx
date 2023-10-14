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
      {searchResults.people.length === 0 ? (
        <p>No results</p>
      ) : (
        <ol>
          {searchResults.people.map((person) => {
            return (
              <li key={person.id} onClick={(e) => handleClick(person)}>
                <h3>{person.name}</h3>
                <p>{`${person.knownFor.title} (${person.knownFor.year})`}</p>
                <img
                  src={person.img}
                  alt={`${person.name} portrait`}
                  style={{ height: "100px" }}
                />
              </li>
            );
          })}
        </ol>
      )}
      <button onClick={() => setSearchResults(undefined)}>Try again</button>
    </>
  );
}

export default Results;
