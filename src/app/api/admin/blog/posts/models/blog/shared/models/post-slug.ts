import {InvalidParameterException, MissingParameterException} from "@/core/exceptions/exceptions";

export class PostSlug {
    private constructor(private slug: string) {
    }

    static create(value: string): PostSlug {
        if (!value) {
            throw new MissingParameterException("Post slug cannot be empty");
        }
        if (!/^[a-z0-9-]+$/.test(value))
            throw new InvalidParameterException("Invalid post slug");
        return new PostSlug(value);
    }

    value(): string {
        return this.slug;
    }
}