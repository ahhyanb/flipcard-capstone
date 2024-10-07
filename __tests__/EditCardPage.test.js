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

describe('Edit Card Page "/decks/:deckId/cards/:cardId/edit"', () => {
  test("a way to update a card is present", async () => {
    let wrapper = {};
    await act(() => {
      wrapper = render(
        <MemoryRouter initialEntries={["/decks/2/cards/1/edit"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.querySelector("form")).toBeTruthy();
    });
  });

  test("user is redirected to the home page if the deck id does not match an existing deck", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/99999/cards/1/edit"]}>
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

  test("user is redirected to the deck's page if the card id does not match an existing deck", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/decks/1/cards/99999/edit"]}>
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
});
