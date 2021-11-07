import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer, { UserState } from "./userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface RootState {
  user: UserState;
}

interface CreateStoreOptions {
  preloadedState?: Partial<RootState>;
}

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  version: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (options?: CreateStoreOptions) =>
  configureStore({
    reducer: persistedReducer,
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
