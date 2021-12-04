import React from "react";
import App from "../../App";
import {
  fireEvent,
  render,
  screen,
  waitForElement,
} from "../../misc/testUtils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../../data/apiUtils";
import { toast } from "react-toastify";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("the sign up page", () => {
  test("renders at '/sign-up' without crashing", () => {
    render(<App />, { initialEntries: ["/sign-up"] });

    expect(screen.getByRole("heading", { name: "Sign Up" }));
  });

  test("can sign up the user", async () => {
    const toastMock = jest.spyOn(toast, "success");

    server.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rest.post(baseUrl + "/api/auth/register", (req: any, res, ctx) => {
        expect(req.body?.username).toEqual("maxymoo");
        expect(req.body?.email).toEqual("max@fake.com");
        expect(req.body?.password1).toEqual("minecraft!!!");
        expect(req.body?.password2).toEqual("minecraft!!!");

        return res(
          ctx.status(201),
          ctx.json({
            detail: "Verification e-mail sent.",
          })
        );
      })
    );

    render(<App />, { initialEntries: ["/sign-up"] });

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "maxymoo" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "max@fake.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "minecraft!!!" },
    });
    fireEvent.change(screen.getByLabelText("Password Confirm"), {
      target: { value: "minecraft!!!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitForElement(() =>
      screen.getByText(/Exchange albums, hear new songs/)
    );

    expect(screen.queryByText(/maxymoo/)).not.toBeInTheDocument();

    expect(toastMock).toHaveBeenCalledTimes(1);
    expect(toastMock.mock.calls[0][0]).toEqual(
      "Created a user, you now need to verify your email to login."
    );
  });

  test("can handle a server 500", async () => {
    server.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rest.post(baseUrl + "/api/auth/register", (req: any, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            detail: "AAAAAAAA",
          })
        );
      })
    );

    render(<App />, { initialEntries: ["/sign-up"] });

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "maxymoo" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "max@fake.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "minecraft!!!" },
    });
    fireEvent.change(screen.getByLabelText("Password Confirm"), {
      target: { value: "minecraft!!!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitForElement(() =>
      screen.getByText(
        /Something is wrong, check your answers and please try again later/
      )
    );
  });

  test("can handle no internet", async () => {
    server.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rest.post(baseUrl + "/api/auth/register", (_: any, res) => {
        return res.networkError("They blew up the data center.");
      })
    );

    render(<App />, { initialEntries: ["/sign-up"] });

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "maxymoo" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "max@fake.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "minecraft!!!" },
    });
    fireEvent.change(screen.getByLabelText("Password Confirm"), {
      target: { value: "minecraft!!!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitForElement(() =>
      screen.getByText(
        /There was a problem. Check your internet connection and try again/
      )
    );
  });

  test("displays errors from the server", async () => {
    server.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rest.post(baseUrl + "/api/auth/register", (req: any, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            username: ["A user with that username already exists."],
            password1: ["This password is too common."],
            non_field_errors: ["Your mum smells."],
          })
        );
      })
    );

    render(<App />, { initialEntries: ["/sign-up"] });

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "maxymoo" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "max@fake.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Password Confirm"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitForElement(() => screen.getByText(/Your mum smells/));

    expect(
      screen.getByText(/A user with that username already exists/)
    ).toBeInTheDocument();
    expect(screen.getByText(/This password is too common/)).toBeInTheDocument();
  });

  test("shows some errors without calling the server", async () => {
    server.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rest.post(baseUrl + "/api/auth/register", (req: any, res, ctx) => {
        fail("The server shouldn't even be called in this example.");
      })
    );

    render(<App />, { initialEntries: ["/sign-up"] });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "not an email" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Password Confirm"), {
      target: { value: "passwordUnmatching" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitForElement(() => screen.getByText(/Required/));

    expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
    expect(screen.getByText(/Passwords must match/)).toBeInTheDocument();
  });
});
