import { Link, Route, Routes } from "react-router-dom";
import FindFilms from "./FindFilms";
import About from "./About";
import "./App.css";
import "./Colors.css"

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
    </>
  );
}

export default App;
