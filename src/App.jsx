import { Link, Route, Routes } from "react-router-dom";
import FindFilms from "./FindFilms";
import About from "./About";

function App() {
  return (
    <>
        <h1>Find That Film</h1>
      <Routes>
        <Route path="/" element={<FindFilms />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Link to="/about">About</Link>
    </>
  );
}

export default App;
