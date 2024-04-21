import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SingleCollectionComponent from "../src/components/SingleCollection";

describe("SingleCollectionComponent", () => {
  const props = {
    id: "123",
    name: "Sample Collection",
    category: "Art",
  };

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <SingleCollectionComponent {...props} />
      </MemoryRouter>
    );
  });
});

// ✓ tests/singleCollection.test.jsx (3)
//    ✓ SingleCollection Component (3)
//      ✓ renders correctly

//  Test Files  1 passed (1)
//       Tests  1 passed (1)
//    Start at  22:22:02
//    Duration  594ms
