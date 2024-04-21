import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../src/components/Loader";

describe("Loader Component", () => {
  it("renders the loader container and animation", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader-container")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});

// ✓ tests/loader.test.jsx (1)
//    ✓ Loader Component (1)
//      ✓ renders the loader container and animation

//  Test Files  1 passed (1)
//       Tests  1 passed (1)
//    Start at  22:32:32
//    Duration  581ms
