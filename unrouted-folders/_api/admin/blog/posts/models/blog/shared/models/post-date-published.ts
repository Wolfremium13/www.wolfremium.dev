import {InvalidParameterException} from "@/core/exceptions/exceptions";

export class PostDatePublished {
    private constructor(private readonly date: Date) {
    }

    static create(givenDate: string): PostDatePublished {
        const date = PostDatePublished.parseDate(givenDate);
        return new PostDatePublished(date);
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