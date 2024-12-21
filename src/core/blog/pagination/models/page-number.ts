import {InvalidParameterException} from "@/core/shared/exceptions";

export class PageNumber {
    private constructor(private readonly number: number) {}

    static create(givenValue: number): PageNumber {
        if (isNaN(givenValue)) {
            throw new InvalidParameterException("Page number must be a number");
        }
        if (givenValue < 1) {
            throw new InvalidParameterException("Page number must be greater than 0");
        }
        return new PageNumber(givenValue);
    }

    value(): number {
        return this.number;
    }
}