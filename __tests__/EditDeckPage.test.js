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

describe('Edit Deck Page "/decks/:id/cards/new"', () => {
  test("a way to edit an existing deck is present", async () => {
    let wrapper = {};
    await act(() => {
      wrapper = render(
        <MemoryRouter initialEntries={["/decks/3/edit"]}>
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
        <MemoryRouter initialEntries={["/decks/99999/edit"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("React Router")).toBeTruthy();
    });
  });
});