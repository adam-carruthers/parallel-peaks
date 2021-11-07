import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "../../misc/testUtils";
import App from "../../App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../../data/apiUtils";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("the login page", () => {
  test("can login the user", async () => {
    server.use(
      rest.post(baseUrl + "/api/auth/login", (req: any, res, ctx) => {
        expect(req.body?.username).toEqual("goodyguts");
        expect(req.body?.password).toEqual("correct-pass");

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

    render(<App />, {
      initialEntries: ["/login"],
    });

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "goodyguts" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "correct-pass" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitForElement(() => screen.getByText(/goodyguts/)); // If this fails it might be because the expects in the server have failed

    expect(screen.getByText(/Logout/)).toBeInTheDocument();
  });

  test("can handle server 500s", async () => {
    server.use(
      rest.post(baseUrl + "/api/auth/login", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            msg: "AAAAAAAAAAAAA",
          })
        );
      })
    );

    render(<App />, {
      initialEntries: ["/login"],
    });

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "NULL%%200" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "causeserror'; DROP TABLE users;" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitForElement(() => screen.getByText(/There was an error/)); // If this fails it might be because the expects in the server have failed

    expect(screen.queryByText(/Logout/)).not.toBeInTheDocument();
  });

  test("shows error from server for non-field errors", async () => {
    server.use(
      rest.post(baseUrl + "/api/auth/login", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            non_field_errors: ["AAAA"],
          })
        );
      })
    );
    render(<App />, {
      initialEntries: ["/login"],
    });

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "goodyguts" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "bad-pass" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitForElement(() => screen.getByText(/AAAA/));
  });
});
