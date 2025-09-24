import {InvalidParameterException} from "@/core/exceptions/exceptions";

export class TotalPages {
    private constructor(private readonly totalPages: number) {}

    static create(value: number): TotalPages {
        if (isNaN(value)) {
            throw new InvalidParameterException("Total pages must be a number");
        }
        if (value < -1) {
            throw new InvalidParameterException("Total pages must be greater than -1");
        }
        return new TotalPages(value);
    }

    value(): number {
        return this.totalPages;
    }
}