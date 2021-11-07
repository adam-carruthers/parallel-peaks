import React from "react";
import {
  fireEvent,
  preloadedStateLoggedInUser,
  render,
  screen,
  waitForElement,
} from "../../misc/testUtils";
import App from "../../App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../../data/apiUtils";
import { Route } from "react-router";

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
  test("render the 401 page when at the protected route '/home' and not logged in", () => {
    render(<App />, { initialEntries: ["/home"] });

    expect(screen.getByText(/401/)).toBeInTheDocument();
    expect(screen.queryByText(/home to be built/i)).not.toBeInTheDocument();
  });
  test("render the home page when at the protected route '/home' and logged in", () => {
    render(<App />, {
      initialEntries: ["/home"],
      preloadedState: preloadedStateLoggedInUser,
    });

    expect(screen.getByText(/home to be built/i)).toBeInTheDocument();
  });
});

describe("the routesNeedLogin component", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("reroutes the user back to the page they were at when they were hit by the 401 if they log in", async () => {
    server.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rest.post(baseUrl + "/api/auth/login", (req: any, res, ctx) => {
        return res(
          ctx.json({
            token: "faketokennnn",
            user: {
              id: 10,
              username: "goodyguts",
              email: "adamjcarruthers27@gmail.com",
              is_staff: false,
              is_matcher: false,
              is_moderator: false,
              first_name: "",
              last_name: "",
              matching_entry: null,
            },
          })
        );
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let testLocation: any = undefined;

    const { container } = render(
      <>
        <App />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </>,
      {
        initialEntries: ["/home?fakequery=abcd"],
      }
    );
    expect(screen.getByText(/401/)).toBeInTheDocument();

    const loginButtonArrow = container.querySelector(".fas.fa-arrow-right");
    if (!loginButtonArrow) throw new Error("login arrow should be there");
    fireEvent.click(loginButtonArrow);

    await waitForElement(() => screen.getByPlaceholderText("Username"));

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "goodyguts" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "correct-pass" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitForElement(() => screen.getByText(/goodyguts/));

    expect(testLocation?.pathname).toEqual("/home");
    expect(testLocation?.search).toEqual("?fakequery=abcd");
  });
});
