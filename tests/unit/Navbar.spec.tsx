import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../../components/navigation/Navbar";
import "@testing-library/jest-dom/extend-expect";

describe("Navigation bar should", () => {
  test("have a toggle button", () => {
    render(<Navbar />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("does not display navigation links by default", () => {
    render(<Navbar />);
    const navigationLinks = screen.queryAllByRole("listitem");
    expect(navigationLinks).toHaveLength(0);
  });

  test("display navigation links when button is pressed", () => {
    render(<Navbar />);
    const button = screen.getByRole("button");
  
    fireEvent.click(button);

    const navigationLinks = screen.queryAllByRole("listitem");
    expect(navigationLinks.length).toBeGreaterThanOrEqual(1);
  });
});
