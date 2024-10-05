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

describe('New Deck Page "/decks/new"', () => {
  test("a way to create a new deck is present", async () => {
    let wrapper = {};
    await act(() => {
      wrapper = render(
        <MemoryRouter initialEntries={["/decks/new"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.querySelector("form")).toBeTruthy();
    });
  });
});
