import { baseUrl } from "./apiUtils";
import type { User } from "./userSlice";

export const userRefreshUrl = `${baseUrl}/api/auth/user`;

export const authenticatedHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Token ${token}`,
});

export const getUserRefreshFetchArgs = (token: string) => [
  userRefreshUrl,
  {
    headers: authenticatedHeaders(token),
  },
];

export interface LoginRequestResponse {
  token: string;
  user: User;
}
