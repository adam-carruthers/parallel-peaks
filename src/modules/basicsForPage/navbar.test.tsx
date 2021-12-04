import React from "react";
import App from "../../App";
import {
  preloadedStateLoggedInUser,
  render,
  screen,
  fireEvent,
} from "../../misc/testUtils";
import Navbar from "./navbar";

describe("the navbar", () => {
  test("renders correctly not logged in", () => {
    render(<Navbar />);

    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });
  test("renders correctly logged in", () => {
    render(<Navbar />, {
      preloadedState: preloadedStateLoggedInUser,
    });

    expect(screen.queryByText(/Login/)).not.toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/goodyguts/)).toBeInTheDocument();
  });
  test("can logout with logout button", async () => {
    render(<App />, {
      preloadedState: preloadedStateLoggedInUser,
      initialEntries: ["/home"],
    });

    expect(screen.getByText(/goodyguts/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Logout/));

    await screen.findByText(/Exchange albums/);

    expect(screen.getAllByText(/Login/).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/goodyguts/)).not.toBeInTheDocument();
  });
});
