import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, describe, test } from "vitest";
import "@testing-library/jest-dom/extend-expect";
import { Footer } from "@/components/navigation/Footer";

beforeAll(() => {
  const mockClipboard = {
    writeText: vi.fn(),
    readText: vi.fn(() => Promise.resolve("irrelevant@gmail.com")),
    read: vi.fn(),
    write: vi.fn(),
    addEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    removeEventListener: vi.fn(),
  };

  Object.defineProperty(global.navigator, "clipboard", {
    value: mockClipboard,
    configurable: true,
  });
});

describe("Footer should ", () => {
  describe("on both window sizes", () => {
    test("copy the email to clipboard", () => {
      render(<Footer />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(
        "wolfremiuminformatica@gmail.com"
      );
    });

    test("display social links", () => {
      render(<Footer />);

      const socialLinks = screen.queryAllByRole("link");
      expect(socialLinks.length).toBeGreaterThanOrEqual(1);
    });

    test("display the author", () => {
      render(<Footer />);

      const author = screen.getByRole("author");

      expect(author).toBeInTheDocument();
    });
  });
});
