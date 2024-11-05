import {PaginationNumbersToShow} from "@/core/blog/pagination/domain/pagination-numbers-to-show";

export class PaginationNumbers {
    private readonly MAX_PAGINATION_NUMBERS: number = 5;

    constructor(
        private readonly currentPage: number,
        private readonly total: number) {
    }

    calculate(): PaginationNumbersToShow {
        if (this.total <= this.MAX_PAGINATION_NUMBERS) {
            return new PaginationNumbersToShow(Array.from({length: this.total}, (_, i) => i + 1));
        }
        if (this.currentPage <= 3) {
            return new PaginationNumbersToShow([1, 2, 3, 4, 5]);
        }
        if (this.currentPage >= this.total - 2) {
            return new PaginationNumbersToShow([
                this.total - 4,
                this.total - 3,
                this.total - 2,
                this.total - 1,
                this.total
            ]);
        }
        return new PaginationNumbersToShow([
            this.currentPage - 2,
            this.currentPage - 1,
            this.currentPage,
            this.currentPage + 1,
            this.currentPage + 2,
        ]);
    }
}