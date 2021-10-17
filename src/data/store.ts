import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./userSlice";

export interface RootState {
  user: UserState;
}

interface CreateStoreOptions {
  preloadedState?: Partial<RootState>;
}

export const createStore = (options?: CreateStoreOptions) =>
  configureStore({
    reducer: {
      user: userReducer,
    },
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
