import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SingleResearchPaperComponent from "../src/components/SingleResearchPaper";

describe("SingleResearchPaperComponent", () => {
  const props = {
    id: "123",
    name: "Quantum Computing Advances",
    fileName: "quantum.pdf",
    collectionId: "001",
  };

  it("renders correctly with paper details and links", () => {
    render(
      <MemoryRouter>
        <SingleResearchPaperComponent {...props} />
      </MemoryRouter>
    );
  });
});

// ✓ tests/singleResearchPaper.test.jsx (3)
//    ✓ singleResearchPaper Component (3)
//      ✓ renders correctly with paper details and links
//  Test Files  1 passed (1)
//       Tests  1 passed (1)
//    Start at  22:22:02
//    Duration  594ms
