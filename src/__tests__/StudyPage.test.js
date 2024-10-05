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

describe('Study Page "/decks/:id/study"', () => {
  test("the first card is displayed to the user on load", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/1/study"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "What is the difference between the Real DOM and Virtual DOM?"
        )
      ).toBeTruthy();
    });
  });

  test('"Not enough cards" is displayed if there are less than 3 cards in the deck', async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/2/study"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/not enough cards/i)).toBeTruthy();
    });
  });

  test("user is redirected to the home page if the deck id does not match an existing deck", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/99999/study"]}>
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