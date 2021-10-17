import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_matcher: boolean;
  is_moderator: boolean;
  first_name: string;
  last_name: string;
  matching_entry: object | null; // TODO: Make this more specific
}

export interface UserLoadedState extends User {
  token: string;
}

export interface LoginRequestResponse {
  token: string;
  user: User;
}

type UserState = null | UserLoadedState;

const initialState: UserState = null;

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

export default userSlice.reducer;
