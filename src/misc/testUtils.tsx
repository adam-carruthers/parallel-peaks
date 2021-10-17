import React from "react";
import { render as oldRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { LocationDescriptor } from "history";
import { Provider } from "react-redux";
import { createStore, RootState } from "../data/store";
import { exampleUser } from "../data/userSlice";

interface TestOptions {
  initialEntries?: LocationDescriptor[];
  preloadedState?: Partial<RootState>;
}

const render = (
  ui: React.ReactElement,
  testOptions?: TestOptions,
  renderOptions?: Parameters<typeof oldRender>[1]
) => {
  testOptions = {
    initialEntries: ["/"],
    ...testOptions,
  };
  const store = createStore({
    preloadedState: testOptions.preloadedState,
  });
  return oldRender(
    <MemoryRouter initialEntries={testOptions.initialEntries}>
      <Provider store={store}>{ui}</Provider>
    </MemoryRouter>,
    renderOptions
  );
};

export const preloadedStateLoggedInUser = {
  user: {
    token: "faketoken",
    ...exampleUser,
  },
} as const;

export * from "@testing-library/react";
export { render };
