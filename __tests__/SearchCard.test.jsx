import Search from "../src/SearchCard/Search";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { genres } from "./data/index.js";
import { submitSearch, submitGenre, submitSearchAndChoose } from "./setupFunctions";
import FindFilms from "../src/FindFilms";

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
        render(<FindFilms />);
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
      it("should display the chosen person if they are selected", async () => {
        await submitSearchAndChoose();

        expect(screen.queryByText("George Clooney")).toBeVisible();
        expect(screen.queryByAltText("George Clooney portrait")).toBeVisible();
      });
      it("should hide person list after selecting one person", async () => {
        await submitSearchAndChoose();

        expect(screen.queryByRole("list")).toBeNull();
      });
      it("should hide try again button and show delete button once submitting a person", async () => {
        await submitSearchAndChoose();

        expect(screen.queryByText("Try again")).toBeNull();
        expect(screen.queryByText("del")).toBeVisible();
      });
      it("should take you back to results if you press choose another", async () => {
        const user = userEvent.setup();
        await submitSearchAndChoose();

        const change = screen.getByText("Change selection");
        await user.pointer({ keys: "[MouseLeft]", target: change });

        expect(screen.queryByText("Change selection")).toBeNull();
        expect(screen.queryAllByRole("listitem")).toHaveLength(10);
      });
      it("should remove chosen person when delete button is pressed", async () => {
        const user = userEvent.setup();
        render(<FindFilms />);
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
    render(<FindFilms />);
    const addAnother = screen.getByText("+ add another");

    await user.pointer({ keys: "[MouseLeft]", target: addAnother });

    expect(screen.queryAllByPlaceholderText("Search...")).toHaveLength(2);
  });
  describe("Errors", () => {
    it("should display error if fails to find genres", async () => {
      server.use(
        rest.get("https://find-that-film-backend.adaptable.app/api/genres", (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ msg: "Error" }));
        })
      );
      render(<FindFilms />);

      expect(await screen.findByText("Retry")).toBeVisible();
      expect(await screen.findByText("Error finding genres")).toBeVisible();
    });
    it("should resend the get genres request if retry is pressed", async () => {
      let callCount = 0;
      server.use(
        rest.get("https://find-that-film-backend.adaptable.app/api/genres", (req, res, ctx) => {
          callCount++;
          return res(ctx.status(500), ctx.json({ msg: "Error" }));
        })
      );
      const user = userEvent.setup();
      render(<FindFilms />);
      const retry = await screen.findByText("Retry");

      await user.pointer({ keys: "[MouseLeft]", target: retry });

      expect(callCount).toBe(2);
    });
    it("should display error get request fails", async () => {
      server.use(
        rest.get("https://find-that-film-backend.adaptable.app/api/people", (req,res,ctx) => {
          return res(ctx.status(500), ctx.json({msg: "Error"}))
        })
      )
      await submitSearch()

      expect(screen.queryByText("Error searching")).toBeVisible()
    });
    it('should display "no results found" if no people are returned', async () => {
      server.use(
        rest.get("https://find-that-film-backend.adaptable.app/api/people", (req,res,ctx) => {
          return res(ctx.status(200), ctx.json({people: []}))
        })
      )
      await submitSearch()

      expect(screen.queryByText("No results")).toBeVisible()
    });
  });
});
