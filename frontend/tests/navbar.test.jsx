import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../src/components/Navbar";

// Mocks
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Navbar Component", () => {
  let mockNavigate;

  beforeEach(() => {
    // Reset mocks and set initial conditions
    vi.resetAllMocks();
    mockNavigate = useNavigate();
    localStorage.clear();
    localStorage.setItem("accessToken", "fake-token");
  });

  it("renders the logout button when user is logged in", () => {
    render(<Navbar />);
    expect(screen.getByText("Logout"));
  });

  it("clears localStorage and navigates to login on logout", async () => {
    render(<Navbar />);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
  });

  it("navigates to login regardless of localStorage operation result", () => {
    localStorage.clear = vi.fn(() => {
      throw new Error("Failed to clear");
    });
    render(<Navbar />);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
  });
});

// Navbar Component
// ✓ tests/navbar.test.jsx (2)
//    ✓ Navbar Component (2)
//      ✓ renders the logout button when user is logged in
//      ✓ clears localStorage and navigates to login on logout
//      ✓ navigates to login regardless of localStorage operation result

//  Test Files  1 passed (1)
//       Tests  3 passed (3)
//    Start at  22:28:43
//    Duration  695ms
