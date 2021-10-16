import React from "react";
import { render as oldRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { InitialEntry } from "history";
import { Provider } from "react-redux";
import { store } from "../data/store";

interface TestOptions {
  initialEntries?: InitialEntry[];
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
  oldRender(
    <MemoryRouter initialEntries={testOptions.initialEntries}>
      <Provider store={store}>{ui}</Provider>
    </MemoryRouter>,
    renderOptions
  );
};

export * from "@testing-library/react";
export { render };
