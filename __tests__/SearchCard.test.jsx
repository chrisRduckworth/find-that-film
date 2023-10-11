import Search from "../src/SearchCard/Search";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { genres } from "./data/index.js";
import SearchCard from "../src/SearchCard/SearchCard";

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
});
