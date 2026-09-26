import { render, screen } from "@testing-library/react";
import Leaderboard from "../components/Leaderboard";
import { describe, expect } from "vitest";

describe("Leaderboard Component", () => {
  const scores = [
    {
      name: "Person 1",
      mins: 3,
      seconds: 4,
    },
    {
      name: "Person 2",
      mins: 1,
      seconds: 2,
    },
  ];

  it("renders correct heading", () => {
    render(<Leaderboard scores={scores} />);
    expect(screen.getByRole("heading").textContent).toMatch(/leaderboard/i);
  });

  it("table is rendered correctly", () => {
    render(<Leaderboard scores={scores} />);
    expect(screen.getByRole("table"));
  });
});
