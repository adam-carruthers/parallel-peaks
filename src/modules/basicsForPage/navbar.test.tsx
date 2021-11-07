import React from "react";
import {
  preloadedStateLoggedInUser,
  render,
  screen,
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
});
