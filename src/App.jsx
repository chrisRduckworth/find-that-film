import { Link, Route, Routes } from "react-router-dom";
import FindFilms from "./FindFilms";
import About from "./About";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1 className="text-center">Find That Film</h1>
      </header>
      <Routes>
        <Route path="/" element={<FindFilms />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <div className="aboutLinkContainer">
        <Link to="/about" className="aboutLink">
          About
        </Link>
      </div>
    </>
  );
}

export default App;
