import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./data/store";
import App from "./App";

describe("the app", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
