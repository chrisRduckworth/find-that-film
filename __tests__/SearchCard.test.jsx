import Search from "../src/SearchCard/Search";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { genres } from "./data/index.js";
import SearchCard from "../src/SearchCard/SearchCard";
import App from "../src/App";

describe("SearchCard", () => {
  describe("Search", () => {
    it("should display a text input when category is director or actor", async () => {
      const user = userEvent.setup();
      render(<Search genres={genres} />);
      const select = screen.getByRole("combobox", { name: "category" });

      expect(screen.queryByPlaceholderText("Search...")).toBeVisible();
      expect(screen.queryByRole("combobox", { name: "genre-list" })).toBeNull();

      await user.selectOptions(select, "director");

      expect(screen.queryByPlaceholderText("Search...")).toBeVisible();
      expect(screen.queryByRole("combobox", { name: "genre-list" })).toBeNull();
    });
    it("should display a dropdown of genres when category is genres and no submit button", async () => {
      const user = userEvent.setup();
      render(<Search genres={genres} />);
      const select = screen.getByRole("combobox", { name: "category" });

      await user.selectOptions(select, "genre");

      expect(screen.queryByPlaceholderText("Search...")).toBeNull();
      expect(
        screen.queryByRole("combobox", { name: "genre-list" })
      ).toBeVisible();
    });
    it("should display invalid search if text input is empty", async () => {
      const user = userEvent.setup();
      render(<Search genres={genres} />);
      const submit = screen.getByText("Submit");

      expect(screen.queryByText("Invalid input")).toBeNull();

      await user.pointer({ keys: "[MouseLeft]", target: submit });

      expect(screen.queryByText("Invalid input")).toBeVisible();
    });
    it("should display invalid search if no chosen genre", async () => {
      const user = userEvent.setup();
      render(<Search genres={genres} />);
      const select = screen.getByRole("combobox", { name: "category" });
      const submit = screen.getByText("Submit");
      await user.selectOptions(select, "genre");

      expect(screen.queryByText("Invalid input")).toBeNull();

      await user.pointer({ keys: "[MouseLeft]", target: submit });
      expect(screen.queryByText("Invalid input")).toBeVisible();
    });
  });
  describe("Results", () => {
    async function submitSearch() {
      function setFinalCriteria() {}
      const user = userEvent.setup();
      render(
        <SearchCard genres={genres} setFinalCriteria={setFinalCriteria} />
      );
      const search = screen.getByPlaceholderText("Search...");
      const submit = screen.getByText("Submit");

      await user.type(search, "clooney");
      await user.pointer({ keys: "[MouseLeft]", target: submit });
    }
    it("after submitting (if category is not genre), should not display categories, search, or submit", async () => {
      await submitSearch();

      expect(screen.queryByRole("combobox", { name: "category" })).toBeNull();
      expect(screen.queryByPlaceholderText("Search...")).toBeNull();
      expect(screen.queryByText("Submit")).toBeNull();
    });
    it("after submitting should display a try again button", async () => {
      await submitSearch();

      expect(screen.queryByText("Try again")).toBeVisible();
    });
    it("after submitting should display a list of actors/directors", async () => {
      await submitSearch();

      expect(screen.queryAllByRole("listitem")).toHaveLength(10);
    });
    it("should go back to search box if try again button is pressed", async () => {
      const user = userEvent.setup();
      await submitSearch();

      const tryAgain = screen.getByText("Try again");
      await user.pointer({ keys: "[MouseLeft]", target: tryAgain });

      expect(screen.queryByRole("list")).toBeNull();
      expect(screen.queryByText("Try again")).toBeNull();
      expect(
        screen.queryByRole("combobox", { name: "category" })
      ).toBeVisible();
      expect(screen.queryByPlaceholderText("Search...")).toBeVisible();
      expect(screen.queryByText("Submit")).toBeVisible();
    });
  });
  describe("Chosen", () => {
    describe("genre", () => {
      async function submitGenre() {
        function setFinalCriteria() {}
        const user = userEvent.setup();
        render(
          <SearchCard genres={genres} setFinalCriteria={setFinalCriteria} />
        );
        const select = screen.getByRole("combobox", { name: "category" });
        await user.selectOptions(select, "genre");
        const genreList = screen.getByRole("combobox", { name: "genre-list" });
        await user.selectOptions(genreList, "Action");
        const submit = screen.getByText("Submit");

        await user.pointer({ keys: "[MouseLeft]", target: submit });
      }
      it("should display chosen genre after submitting", async () => {
        await submitGenre();

        expect(screen.queryByText("Genre: Action")).toBeVisible();
      });
      it("should hide submit button, add delete button when submitting a genre", async () => {
        await submitGenre();

        expect(screen.queryByText("Submit")).toBeNull();
        expect(screen.queryByText("del")).toBeVisible();
      });
      it("should remove chosen genre when delete button is pressed", async () => {
        const user = userEvent.setup();
        render(<App />);
        const select = screen.getByRole("combobox", { name: "category" });
        await user.selectOptions(select, "genre");
        const genreList = screen.getByRole("combobox", { name: "genre-list" });
        await user.selectOptions(genreList, "Action");
        const submit = screen.getByText("Submit");
        await user.pointer({ keys: "[MouseLeft]", target: submit });

        const del = screen.getByText("del");
        await user.pointer({ keys: "[MouseLeft]", target: del });

        expect(screen.queryByText("Genre: Action")).toBeNull();
        expect(screen.queryByText("del")).toBeNull();
      });
    });
    describe("person", () => {
      async function submitSearch() {
        function setFinalCriteria() {}
        const user = userEvent.setup();
        render(
          <SearchCard genres={genres} setFinalCriteria={setFinalCriteria} />
        );
        const search = screen.getByPlaceholderText("Search...");
        const submit = screen.getByText("Submit");

        await user.type(search, "clooney");
        await user.pointer({ keys: "[MouseLeft]", target: submit });

        const george = screen.getAllByRole("listitem")[0];
        await user.pointer({ keys: "[MouseLeft]", target: george });
      }
      it("should display the chosen person if they are selected", async () => {
        await submitSearch();

        expect(screen.queryByText("George Clooney")).toBeVisible();
        expect(screen.queryByAltText("George Clooney portrait")).toBeVisible();
      });
      it("should hide person list after selecting one person", async () => {
        await submitSearch();

        expect(screen.queryByRole("list")).toBeNull();
      });
      it("should hide try again button and show delete button once submitting a person", async () => {
        await submitSearch();

        expect(screen.queryByText("Try again")).toBeNull();
        expect(screen.queryByText("del")).toBeVisible();
      });
      it("should take you back to results if you press choose another", async () => {
        const user = userEvent.setup();
        await submitSearch();

        const change = screen.getByText("Change selection");
        await user.pointer({ keys: "[MouseLeft]", target: change });

        expect(screen.queryByText("Change selection")).toBeNull();
        expect(screen.queryAllByRole("listitem")).toHaveLength(10);
      });
      it("should remove chosen person when delete button is pressed", async () => {
        const user = userEvent.setup();
        render(<App />);
        const search = screen.getByPlaceholderText("Search...");
        const submit = screen.getByText("Submit");
        await user.type(search, "clooney");
        await user.pointer({ keys: "[MouseLeft]", target: submit });
        const george = screen.getAllByRole("listitem")[0];
        await user.pointer({ keys: "[MouseLeft]", target: george });

        const del = screen.getByText("del");
        await user.pointer({ keys: "[MouseLeft]", target: del });

        expect(screen.queryByText("George Clooney")).toBeNull();
        expect(screen.queryByAltText("George Clooney portrait")).toBeNull();
        expect(screen.queryByText("del")).toBeNull();
      });
    });
  });
  it("should add another search card when button is pressed", async () => {
    const user = userEvent.setup();
    render(<App />);
    const addAnother = screen.getByText("+ add another");

    await user.pointer({ keys: "[MouseLeft]", target: addAnother });

    expect(screen.queryAllByPlaceholderText("Search...")).toHaveLength(2);
  });
});
// error handling: genres, people
// no people found
// consitent use of get for set up and query for tests
