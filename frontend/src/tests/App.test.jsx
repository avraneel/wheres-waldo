import { render, screen } from "@testing-library/react";

import App from "../components/App";
import { expect } from "vitest";

describe("App component", () => {
  it("renders correct heading", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch(/where's waldo/);
    // check if App components renders headline
  });
});
