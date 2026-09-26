import { render, screen } from "@testing-library/react";

import Sidebar from "../components/Sidebar";
import { describe, expect } from "vitest";

describe("Sidebar Component", () => {
  // mocking characters
  const characters = [
    {
      name: "Character 1",
    },
    {
      name: "Character 2",
    },
  ];

  test("renders correct heading", () => {
    render(<Sidebar chars={characters} />);
    expect(screen.getByRole("heading").textContent).toMatch(/characters/i);
  });
});
