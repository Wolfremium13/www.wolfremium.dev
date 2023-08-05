import { render, screen, fireEvent } from "@testing-library/react";
import { NavbarLogic } from "../../components/navigation/Navbar";
import "@testing-library/jest-dom/extend-expect";

describe("Navigation bar should ", () => {
  describe("on mobile window size", () => {
    test("have a toggle button", () => {
      render(
        <NavbarLogic isMobile={true} isOpen={false} setIsOpen={() => {}} />
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    test("not display navigation links by default", () => {
      render(
        <NavbarLogic isMobile={true} isOpen={false} setIsOpen={() => {}} />
      );
      const navigationLinks = screen.queryAllByRole("listitem");
      expect(navigationLinks).toHaveLength(0);
    });

    test("display navigation links when button is pressed", () => {
      // I cannot mutate the state of the parent component from here
      const setIsOpenMock = jest.fn(() => {});
      render(
        <NavbarLogic isMobile={true} isOpen={false} setIsOpen={setIsOpenMock} />
      );
      fireEvent.click(screen.getByRole("button"));

      expect(setIsOpenMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("on desktop window size", () => {
    test("not have a toggle button", () => {
      render(
        <NavbarLogic isMobile={false} isOpen={true} setIsOpen={() => {}} />
      );

      const button = screen.queryByRole("button");
      expect(button).not.toBeInTheDocument();
    });

    test("display navigation links", () => {
      render(
        <NavbarLogic isMobile={false} isOpen={true} setIsOpen={() => {}} />
      );

      const navigationLinks = screen.queryAllByRole("listitem");
      expect(navigationLinks.length).toBeGreaterThanOrEqual(1);
    });
  });
});
