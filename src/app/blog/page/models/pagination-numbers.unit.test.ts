import {describe, expect, it} from "vitest"
import {PaginationNumbers} from "@/app/blog/page/models/pagination-numbers";

describe("Pagination numbers should", () => {
    const MAX_PAGINATION_NUMBERS_TO_SHOW = 5;
    it("fill until total pages", () => {
        const currentPage = 1;
        const totalPages = 4;
        const paginationNumbers = new PaginationNumbers(currentPage, totalPages);

        const paginationNumbersToShow = paginationNumbers.calculate();

        expect(paginationNumbersToShow.value).toEqual([1, 2, 3, 4]);
    });

    it("fill until total pages reach the maximum pages to show", () => {
        const currentPage = 1;
        const totalPages = 10;
        const paginationNumbers = new PaginationNumbers(currentPage, totalPages);

        const paginationNumbersToShow = paginationNumbers.calculate();

        expect(paginationNumbersToShow.value.length).toEqual(MAX_PAGINATION_NUMBERS_TO_SHOW);
        expect(paginationNumbersToShow.value).toEqual([1, 2, 3, 4, 5]);
    });

    it("fill backwards until total pages reach the maximum pages to show", () => {
        const currentPage = 8;
        const totalPages = 10;
        const paginationNumbers = new PaginationNumbers(currentPage, totalPages);

        const paginationNumbersToShow = paginationNumbers.calculate();

        expect(paginationNumbersToShow.value.length).toEqual(MAX_PAGINATION_NUMBERS_TO_SHOW);
        expect(paginationNumbersToShow.value).toEqual([6, 7, 8, 9, 10]);
    });

    it("fill in the middle of the pagination", () => {
        const currentPage = 5;
        const totalPages = 10;
        const paginationNumbers = new PaginationNumbers(currentPage, totalPages);

        const paginationNumbersToShow = paginationNumbers.calculate();

        expect(paginationNumbersToShow.value).toEqual([3, 4, 5, 6, 7]);
    });

    it("fill in the middle of the pagination when the total pages are less than the maximum pages to show", () => {
        const currentPage = 2;
        const totalPages = 4;
        const paginationNumbers = new PaginationNumbers(currentPage, totalPages);

        const paginationNumbersToShow = paginationNumbers.calculate();

        expect(paginationNumbersToShow.value).toEqual([1, 2, 3, 4]);
    });
});