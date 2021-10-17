import { baseUrl } from "./apiUtils";

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

export const login;
