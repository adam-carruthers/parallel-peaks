import React from "react";
import {
  preloadedStateLoggedInUser,
  render,
  screen,
} from "../../misc/testUtils";
import PageIndex from "./pageIndex";

describe("the navbar", () => {
  test("renders correctly not logged in", () => {
    render(<PageIndex />);

    expect(screen.getByText(/Sign up to be matched/)).toBeInTheDocument();
  });
  test("renders correctly logged in", () => {
    render(<PageIndex />, {
      preloadedState: preloadedStateLoggedInUser,
    });

    expect(screen.queryByText(/Login/)).not.toBeInTheDocument();
    expect(screen.getByText(/Go to your home/)).toBeInTheDocument();
    expect(screen.getByText(/See your profile/)).toBeInTheDocument();
  });
});
