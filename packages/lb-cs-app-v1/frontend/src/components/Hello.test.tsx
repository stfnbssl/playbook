import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

describe("Hello", () => {
  it("renders with default name", () => {
    render(<Hello />);
    expect(screen.getByText(/Hello, world/i)).toBeInTheDocument();
  });
});
