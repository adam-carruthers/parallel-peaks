import { createSlice } from "@reduxjs/toolkit";

interface userLoadedState {
  token: string;
}

type userState = Record<string, never> | userLoadedState;

const initialState: userState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
