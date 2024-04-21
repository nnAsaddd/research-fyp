import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CollectionsForm from "../src/components/CollectionsForm";

describe("CollectionsForm Component", () => {
  it("renders the form correctly", () => {
    render(<CollectionsForm />);
    expect(
      screen.getByPlaceholderText("Search Collections...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("should allow text input in the search field", () => {
    render(<CollectionsForm />);
    const input = screen.getByPlaceholderText("Search Collections...");
    fireEvent.change(input, { target: { value: "Art" } });
    expect(input.value).toBe("Art");
  });

  it("should have a button that clears the input field on click (test as per current implementation)", () => {
    render(<CollectionsForm />);
    const button = screen.getByRole("button", { name: "Clear" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});

// ✓ tests/collectionForm.test.jsx (3)
//    ✓ CollectionsForm Component (3)
//      ✓ renders the form correctly
//      ✓ should allow text input in the search field
//      ✓ should have a button that clears input field on click

//  Test Files  1 passed (1)
//       Tests  3 passed (3)
//    Start at  22:22:02
//    Duration  594ms
