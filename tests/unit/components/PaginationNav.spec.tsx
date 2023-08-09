import { PaginationNav } from "@/components/navigation/PaginationNav";
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import "@testing-library/jest-dom/extend-expect";

describe("Pagination navigator should", () => {
  describe("on arrow navigation", () => {
    it("display first page and previous page links if current page is greater than 1", () => {
      render(<PaginationNav page={3} totalPages={5} />);

      const firstPageLink = screen.getByRole("link", { name: /First Page/i });
      const previousPageLink = screen.getByRole("link", {
        name: /Previous Page/i,
      });

      expect(firstPageLink).toBeInTheDocument();
      expect(previousPageLink).toBeInTheDocument();
    });

    it("not display first page and previous page links if current page is 1", () => {
      render(<PaginationNav page={1} totalPages={5} />);

      const firstPageLink = screen.queryByRole("link", { name: /First Page/i });
      const previousPageLink = screen.queryByRole("link", {
        name: /Previous Page/i,
      });

      expect(firstPageLink).not.toBeInTheDocument();
      expect(previousPageLink).not.toBeInTheDocument();
    });

    it("display next page and last page links if current page is less than total pages", () => {
      render(<PaginationNav page={3} totalPages={5} />);

      const nextPageLink = screen.getByRole("link", { name: /Next Page/i });
      const lastPageLink = screen.getByRole("link", { name: /Last Page/i });

      expect(nextPageLink).toBeInTheDocument();
      expect(lastPageLink).toBeInTheDocument();
    });

    it("not display next page and last page links if current page is the last one", () => {
      render(<PaginationNav page={5} totalPages={5} />);

      const nextPageLink = screen.queryByRole("link", { name: /Next Page/i });
      const lastPageLink = screen.queryByRole("link", { name: /Last Page/i });

      expect(nextPageLink).not.toBeInTheDocument();
      expect(lastPageLink).not.toBeInTheDocument();
    });
  });

  describe("on pagination numbers", () => {
    const displayablePages = 5;

    describe("on circles displays the all displayable circles when", () => {
      it("have the same number as total pages", () => {
        const pageNumber = 1;
        const totalPages = displayablePages;

        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const circles = screen.getAllByRole("link", { name: /Go to page /i });
        expect(circles).toHaveLength(displayablePages);
      });

      it("is greater than total pages", () => {
        const pageNumber = 1;
        const totalPages = displayablePages - 1;

        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const circles = screen.getAllByRole("link", { name: /Go to page /i });
        expect(circles).toHaveLength(totalPages);
      });

      it("is less than total pages", () => {
        const pageNumber = 1;
        const totalPages = displayablePages + 1;

        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const circles = screen.getAllByRole("link", { name: /Go to page /i });
        expect(circles).toHaveLength(displayablePages);
      });

      it("is less than total pages and current page is the last one", () => {
        const pageNumber = displayablePages;
        const totalPages = displayablePages + 1;

        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const circles = screen.getAllByRole("link", { name: /Go to page /i });
        expect(circles).toHaveLength(displayablePages);
      });

      it("is greater than total pages and current page is the last one", () => {
        const pageNumber = displayablePages;
        const totalPages = displayablePages - 1;

        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const circles = screen.getAllByRole("link", { name: /Go to page /i });
        expect(circles).toHaveLength(totalPages);
      });
    });

    describe("on the pagination numbers displays correctly when we have", () => {
      it("the same displayable numbers as total pages", () => {
        const pageNumber = 1;
        const totalPages = displayablePages;
        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const paginationNumbers = Array.from(
          { length: displayablePages },
          (_, i) => pageNumber + i
        ).map((num) => screen.getByText(num.toString()));

        paginationNumbers.forEach((numElement) => {
          expect(numElement).toBeInTheDocument();
        });
      });

      it("more displayable numbers than total pages", () => {
        const pageNumber = 1;
        const totalPages = displayablePages - 1;
        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const paginationNumbers = Array.from(
          { length: totalPages },
          (_, i) => pageNumber + i
        ).map((num) => screen.getByText(num.toString()));

        paginationNumbers.forEach((numElement) => {
          expect(numElement).toBeInTheDocument();
        });
      });

      it("less displayable numbers than total pages", () => {
        const pageNumber = 1;
        const totalPages = displayablePages + 1;
        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const paginationNumbers = Array.from(
          { length: displayablePages },
          (_, i) => pageNumber + i
        ).map((num) => screen.getByText(num.toString()));

        paginationNumbers.forEach((numElement) => {
          expect(numElement).toBeInTheDocument();
        });
      });

      it("on the middle of displayable numbers", () => {
        const pageNumber = Math.round(displayablePages / 2);
        const totalPages = displayablePages;
        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const paginationNumbers = [1, 2, 3, 4, 5].map((num) =>
          screen.getByText(num.toString())
        );

        paginationNumbers.forEach((numElement) => {
          expect(numElement).toBeInTheDocument();
        });
      });

      it("more displayable numbers than total pages and current page is the last one", () => {
        const pageNumber = displayablePages;
        const totalPages = displayablePages - 1;
        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const paginationNumbers = [1, 2, 3, 4];

        paginationNumbers.forEach((num) => {
          const numElement = screen.getByText(num.toString());
          expect(numElement).toBeInTheDocument();
        });
      });

      it("less displayable numbers than total pages and current page is the last one", () => {
        const pageNumber = displayablePages;
        const totalPages = displayablePages + 1;
        render(<PaginationNav page={pageNumber} totalPages={totalPages} />);

        const paginationNumbers = [5, 6];

        paginationNumbers.forEach((num) => {
          const numElement = screen.getByText(num.toString());
          expect(numElement).toBeInTheDocument();
        });
      });
    });
  });
});
