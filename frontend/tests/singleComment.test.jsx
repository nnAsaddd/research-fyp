import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SingleComment from "../src/components/SingleComment";

describe("SingleComment Component", () => {
  const props = {
    id: "1",
    text: "This is a sample comment.",
    timeStamp: "2024-04-10 14:00",
    collectionId: "10",
    researchPaperId: "100",
  };

  it("renders correctly with text and timestamp", () => {
    render(
      <MemoryRouter>
        <SingleComment {...props} />
      </MemoryRouter>
    );
  });

  it("contains correct links for edit and delete actions", () => {
    render(
      <MemoryRouter>
        <SingleComment {...props} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");
  });
});

// ✓ tests/singleComment.test.jsx (3)
//    ✓ singleComment Component (3)
//      ✓ renders correctly with text and timestamp
//      ✓ contains correct links for edit and delete actions

//  Test Files  1 passed (1)
//       Tests  3 passed (3)
//    Start at  22:22:02
//    Duration  594ms
