import { APIError, APIFormError, baseUrl } from "./apiUtils";
import type { User } from "./userSlice";

export const authenticatedHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Token ${token}`,
});

export interface LoginRequestResponse {
  token: string;
  user: User;
}

export const loginApi = async (
  username: string,
  password: string
): Promise<LoginRequestResponse> => {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const loginJson = await response.json();

  if (response.status !== 200) {
    console.error(loginJson);
    // For this particular endpoint I think it is guaranteed that all errors will be non-field errors
    if (loginJson.non_field_errors) {
      throw new APIError(loginJson.non_field_errors.join(" - "));
    } else {
      throw new APIError("There was an error, please try again.");
    }
  }

  return loginJson as LoginRequestResponse;
};

export const registerApi = async (
  username: string,
  email: string,
  password1: string,
  password2: string
): Promise<void> => {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password1,
      password2,
    }),
  });
  const responseJson = await response.json();

  if (response.status !== 201) {
    console.error(responseJson);
    // Only use the error sent from the server if it has one of the following properties
    if (
      ["username", "email", "password1", "password2", "non_field_errors"].some(
        (property) => property in responseJson
      )
    )
      throw new APIFormError(responseJson);
    else
      throw new APIFormError({
        non_field_errors: [
          "Something is wrong, check your answers and please try again later.",
        ],
      });
  }
};

export const confirmEmailApi = async (token: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/api/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: token,
    }),
  });
  const responseJson = response.json();

  if (response.status !== 200) {
    console.error(responseJson);
    throw new APIError(
      "The verify email code given was not correct. " +
        "Please try clicking the link in your email again and if that fails then please try logging in again. " +
        "This will send you a new verify email link."
    );
  }
};
