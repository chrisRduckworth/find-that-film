import { render, screen } from "@testing-library/react";
import Matches from "../src/Matches";
import { matches } from "./data";
import { findFilms } from "./setupFunctions";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { rest } from "msw";

describe("Matches", () => {
  it("should display a list of the matches", () => {
    render(<Matches matches={matches} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(10);
  });
  describe("Integrated", () => {
    it("should display a list of matches after searching for them", async () => {
      await findFilms();

      expect(await screen.findAllByRole("listitem")).toHaveLength(10);
    });
    it("should hide matches if start again button is pressed", async () => {
      const user = userEvent.setup();
      await findFilms();
      const startAgain = screen.getByText("Start Again");

      await user.pointer({ keys: "[MouseLeft]", target: startAgain });

      expect(screen.queryByText("Start again")).toBeNull();
      expect(screen.queryAllByPlaceholderText("listitem")).toHaveLength(0);
    });
    it("should return to start with no criteria if start again is pressed", async () => {
      const user = userEvent.setup();
      await findFilms();
      const startAgain = screen.getByText("Start Again");

      await user.pointer({ keys: "[MouseLeft]", target: startAgain });

      expect(screen.queryByPlaceholderText("Search...")).toBeVisible();
    });
  });
  describe("Errors", () => {
    it("should display an error message if request for films failed", async () => {
      server.use(
        rest.get(
          "https://find-that-film-backend.adaptable.app/api/films",
          (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ msg: "Error" }));
          }
        )
      );
      await findFilms();

      expect(screen.queryByText("Error finding films")).toBeVisible();
      expect(screen.queryByText("Retry")).toBeVisible();
    });
    it("should retry api request if retry button is pressed", async () => {
      let counter = 0;
      server.use(
        rest.get(
          "https://find-that-film-backend.adaptable.app/api/films",
          (req, res, ctx) => {
            counter++;
            return res(ctx.status(500), ctx.json({ msg: "Error" }));
          }
        )
      );
      const user = userEvent.setup();
      await findFilms();
      const retry = screen.getByText("Retry");

      await user.pointer({ keys: "[MouseLeft]", target: retry });

      expect(counter).toBe(2);
    });
    it('should show "no matches found" if 0 matches were found', async () => {
      server.use(
        rest.get(
          "https://find-that-film-backend.adaptable.app/api/films",
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ films: [] }));
          }
        )
      );
      await findFilms();

      expect(screen.queryByText("No films found")).toBeVisible();
    });
  });
});
