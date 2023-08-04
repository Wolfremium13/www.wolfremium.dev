import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../../components/navigation/Navbar";
import "@testing-library/jest-dom/extend-expect";
import { resizeWindowTo } from "./fixtures/screen";

describe("Navigation bar should ", () => {
  const minimumDesktopWidth = 768;
  describe("on mobile window size", () => {
    let originalWidth: number;
    let originalHeight: number;

    beforeEach(() => {
      originalWidth = window.innerWidth;
      originalHeight = window.innerHeight;
      const mobileWith = minimumDesktopWidth - 1;
      resizeWindowTo(mobileWith);
    });

    afterEach(() => {
      resizeWindowTo(originalWidth, originalHeight);
    });

    test("have a toggle button", () => {
      render(<Navbar />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    test("not display navigation links by default", () => {
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

  describe("on desktop window size", () => {
    let originalWidth: number;
    let originalHeight: number;

    beforeEach(() => {
      originalWidth = window.innerWidth;
      originalHeight = window.innerHeight;
      resizeWindowTo(minimumDesktopWidth);
    });

    afterEach(() => {
      resizeWindowTo(originalWidth, originalHeight);
    });

    test("not have a toggle button", () => {
      render(<Navbar />);
      const button = screen.queryByRole("button");
      expect(button).not.toBeInTheDocument();
    });

    test("display navigation links", () => {
      render(<Navbar />);
      const navigationLinks = screen.queryAllByRole("listitem");
      expect(navigationLinks.length).toBeGreaterThanOrEqual(1);
    });
  });
});
