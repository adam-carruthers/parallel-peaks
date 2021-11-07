import { APIError, baseUrl } from "./apiUtils";
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
