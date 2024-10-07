import {
  act,
  render,
  screen,
  getByText,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import App from "../App";
import "../util/fetch.js";

describe('Deck Page "/decks/:id"', () => {
  test("deck information is shown on the page", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/2"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByText("React Router")).toBeTruthy();
      expect(
        screen.getByText("Quiz cards about the React Router library.")
      ).toBeTruthy();
    });
  });

  test("cards are shown on the page", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/2"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "How can you make a route 'catch' all non-matching routes?"
        )
      ).toBeTruthy();
      expect(
        screen.getByText(
          "You can use the asterisk (*) symbol as the value to the path."
        )
      ).toBeTruthy();
      expect(
        screen.getByText(
          "Why should you not use traditional anchor tags with React Router?"
        )
      ).toBeTruthy();
      expect(
        screen.getByText("Anchor tags (<a>) will cause the page to reload.")
      ).toBeTruthy();
    });
  });

  test("user is redirected to the home page if the deck id does not match an existing deck", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/99999"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Basic Data Structures and Algorithms")
      ).toBeTruthy();
    });
  });
});
