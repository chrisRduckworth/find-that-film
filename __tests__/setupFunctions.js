import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SearchCard from "../src/SearchCard/SearchCard";
import { genres } from "./data/index.js";
import App from "../src/App";

export async function submitSearch() {
  function setFinalCriteria() {}
  const user = userEvent.setup();
  render(<SearchCard genres={genres} setFinalCriteria={setFinalCriteria} />);
  const search = screen.getByPlaceholderText("Search...");
  const submit = screen.getByText("Submit");

  await user.type(search, "clooney");
  await user.pointer({ keys: "[MouseLeft]", target: submit });
}

export async function submitGenre() {
  function setFinalCriteria() {}
  const user = userEvent.setup();
  render(<SearchCard genres={genres} setFinalCriteria={setFinalCriteria} />);
  const select = screen.getByRole("combobox", { name: "category" });
  await user.selectOptions(select, "genre");
  const genreList = screen.getByRole("combobox", { name: "genre-list" });
  await user.selectOptions(genreList, "Action");
  const submit = screen.getByText("Submit");

  await user.pointer({ keys: "[MouseLeft]", target: submit });
}

export async function submitSearchAndChoose() {
  function setFinalCriteria() {}
  const user = userEvent.setup();
  render(<SearchCard genres={genres} setFinalCriteria={setFinalCriteria} />);
  const search = screen.getByPlaceholderText("Search...");
  const submit = screen.getByText("Submit");

  await user.type(search, "clooney");
  await user.pointer({ keys: "[MouseLeft]", target: submit });

  const george = screen.getAllByRole("listitem")[0];
  await user.pointer({ keys: "[MouseLeft]", target: george });
}

export async function findFilms() {
  const user = userEvent.setup();
  render(<App />);
  // add george clooney to the list
  const search = screen.getByPlaceholderText("Search...");
  const submit = screen.getByText("Submit");
  await user.type(search, "clooney");
  await user.pointer({ keys: "[MouseLeft]", target: submit });
  const george = screen.getAllByRole("listitem")[0];
  await user.pointer({ keys: "[MouseLeft]", target: george });

  // add action genre
  const addAnother = screen.getByText("+ add another");
  await user.pointer({ keys: "[MouseLeft]", target: addAnother });
  const select = screen.getByRole("combobox", { name: "category" });
  await user.selectOptions(select, "genre");
  const genreList = screen.getByRole("combobox", { name: "genre-list" });
  await user.selectOptions(genreList, "Action");
  const submit2 = screen.getByText("Submit")
  await user.pointer({ keys: "[MouseLeft]", target: submit2 });

  // find films
  const findFilmsButton = screen.getByText("Find films");
  await user.pointer({ keys: "[MouseLeft]", target: findFilmsButton });
}
