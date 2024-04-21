import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "../src/components/Form";

describe("Form Component", () => {
  it("renders the form with an input and a button", () => {
    render(<Form />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("input should be empty initially", () => {
    render(<Form />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("");
  });
});

// ✓ tests/form.test.jsx (2)
//    ✓ Form Component (2)
//      ✓ renders the form with an input and a button
//      ✓ input should be empty initially

//  Test Files  1 passed (1)
//       Tests  2 passed (2)
//    Start at  22:28:43
//    Duration  695ms
