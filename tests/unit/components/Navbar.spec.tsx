import { render, screen, fireEvent } from "@testing-library/react";
import { NavbarLogic } from "../../../components/navigation/Navbar";
import { vi, expect, describe, it } from "vitest";
import '@testing-library/jest-dom/extend-expect';

describe("Navigation bar should ", () => {
  describe("on mobile window size", () => {
    it("have a toggle button", () => {
      render(
        <NavbarLogic isMobile={true} isOpen={false} setIsOpen={() => {}} />
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("not display navigation links by default", () => {
      render(
        <NavbarLogic isMobile={true} isOpen={false} setIsOpen={() => {}} />
      );
      const navigationLinks = screen.queryAllByRole("listitem");
      expect(navigationLinks).toHaveLength(0);
    });

    it("display navigation links when button is pressed", () => {
      // I cannot mutate the state of the parent component from here
      const setIsOpenMock = vi.fn(() => {});
      render(
        <NavbarLogic isMobile={true} isOpen={false} setIsOpen={setIsOpenMock} />
      );
      fireEvent.click(screen.getByRole("button"));

      expect(setIsOpenMock).toHaveBeenCalledTimes(1);
    });

    it("not display github corner", () => {
      render(
        <NavbarLogic isMobile={true} isOpen={true} setIsOpen={() => {}} />
      );

      const githubCorner = screen.queryByLabelText("View source on GitHub");
      expect(githubCorner).not.toBeInTheDocument();
    });
  });

  describe("on desktop window size", () => {
    it("not have a toggle button", () => {
      render(
        <NavbarLogic isMobile={false} isOpen={true} setIsOpen={() => {}} />
      );

      const button = screen.queryByRole("button");
      expect(button).not.toBeInTheDocument();
    });

    it("display navigation links", () => {
      render(
        <NavbarLogic isMobile={false} isOpen={true} setIsOpen={() => {}} />
      );

      const navigationLinks = screen.queryAllByRole("listitem");
      expect(navigationLinks.length).toBeGreaterThanOrEqual(1);
    });

    it("display github corner", () => {
      render(
        <NavbarLogic isMobile={false} isOpen={true} setIsOpen={() => {}} />
      );

      const githubCorner = screen.queryByLabelText("View source on GitHub");
      expect(githubCorner).toBeInTheDocument();
    });
  });
});
