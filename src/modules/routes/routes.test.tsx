import React from "react";
import { render, screen } from "../../misc/testHelp";
import App from "../../App";

describe("the routes", () => {
  test("render the index page when at the route '/'", () => {
    render(<App />, { initialEntries: ["/"] });

    expect(
      screen.getByText(/Exchange albums, hear new songs, meet new people./)
    ).toBeInTheDocument();
  });
  test("render the 404 page when at the route '/this-page-doesnt-exist'", () => {
    render(<App />, { initialEntries: ["/this-page-doesnt-exist"] });

    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
