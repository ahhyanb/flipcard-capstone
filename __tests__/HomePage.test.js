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

describe('Home "/"', () => {
  test("decks and descriptions are shown on the page", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("React")).toBeTruthy();
      expect(
        screen.getByText("Quiz cards about the React frontend framework.")
      ).toBeTruthy();
      expect(screen.getByText("React Router")).toBeTruthy();
      expect(
        screen.getByText("Quiz cards about the React Router library.")
      ).toBeTruthy();
    });
  });
});
