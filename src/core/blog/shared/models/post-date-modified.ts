import {InvalidParameterException} from "@/core/shared/exceptions";

export class PostDateModified {
    private constructor(private readonly date: Date) {
    }

    static create(givenDate: string): PostDateModified {
        const date = PostDateModified.parseDate(givenDate);
        return new PostDateModified(date);
    }

    private static parseDate(givenDate: string): Date {
        const date = new Date(givenDate);
        if (isNaN(date.getTime())) {
            throw new InvalidParameterException(`Invalid date: ${givenDate}`);
        }
        return date;
    }

    value(): string {
        return this.date.toISOString();
    }
}