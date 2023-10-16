import { render, screen } from "@testing-library/react";
import Matches from "../src/Matches";
import { matches } from "./data";
import { findFilms } from "./setupFunctions";
import userEvent from "@testing-library/user-event";

describe("Matches", () => {
  it("should display a list of the matches", () => {
    render(<Matches matches={matches} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(10);
  });
  describe("Integrated", () => {
    it.only("should display a list of matches after searching for them", async () => {
      await findFilms();

      expect(await screen.findAllByRole("listitem")).toHaveLength(10);
    });
    it.only("should hide matches if retry button is pressed", async () => {
      const user = userEvent.setup();
      await findFilms();
      const retry = screen.getByText("Retry");

      await user.pointer({ keys: "[MouseLeft]", target: retry });

      expect(screen.queryByText("Retry")).toBeNull();
      expect(screen.queryByText("Start again")).toBeNull();
      expect(screen.queryAllByRole("listitem")).toHaveLength(2);
    });
    it("should return to previous criteria if retry button is pressed", () => {});
    it("should hide matches if start again button is pressed", () => {});
    it("should return to start with no criteria if start again is pressed", () => {});
    // errors:
    // server error
    // no matches
  });
});
