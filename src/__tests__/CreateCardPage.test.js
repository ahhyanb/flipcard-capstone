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

describe('Create Card Page "/decks/:id/cards/new"', () => {
  test("a way to create a new deck is present", async () => {
    let wrapper = {};
    await act(() => {
      wrapper = render(
        <MemoryRouter initialEntries={["/decks/3/cards/new"]}>
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
        <MemoryRouter initialEntries={["/decks/99999/cards/new"]}>
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
