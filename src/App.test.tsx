import React from "react";
import { render } from "./misc/testHelp";
import App from "./App";

describe("the app", () => {
  test("renders without crashing", () => {
    render(<App />);
  });
});
