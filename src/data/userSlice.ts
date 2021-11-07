import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { LoginRequestResponse } from "./userApi";

export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_matcher: boolean;
  is_moderator: boolean;
  first_name: string;
  last_name: string;
  matching_entry: Record<string, unknown> | null; // TODO: Make this more specific
}

export const exampleUser: User = {
  id: 10,
  username: "goodyguts",
  email: "adamjcarruthers27@gmail.com",
  is_staff: false,
  is_matcher: false,
  is_moderator: false,
  first_name: "",
  last_name: "",
  matching_entry: null,
} as const;

export interface UserLoadedState extends User {
  token: string;
}

export type UserState = null | UserLoadedState;

const initialState: UserState = null;

interface ActionTypes {
  login: ActionCreatorWithPayload<LoginRequestResponse>;
  setUser: ActionCreatorWithPayload<User>;
  logout: ActionCreatorWithoutPayload;
}

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>, "user">({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<LoginRequestResponse>
    ): UserLoadedState => {
      return {
        ...action.payload.user,
        token: action.payload.token,
      };
    },
    setUser: (state, action: PayloadAction<User>) => {
      if (state)
        return {
          ...action.payload,
          token: state.token,
        };
      throw new Error(
        "Attempt to set user without the current state having a token."
      );
    },
    logout: () => null, // When logging out the state returns to be an empty object
  },
});

export const { login, setUser, logout }: ActionTypes =
  userSlice.actions as unknown as ActionTypes;

export const isUserLoggedIn = (state: RootState) => state.user !== null;
export const userUsername = (state: RootState) => state.user?.username || "";
export const userIsMatcher = (state: RootState) =>
  state.user?.is_matcher || false;

export default userSlice.reducer;
