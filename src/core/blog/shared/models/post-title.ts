import {MissingParameterException} from "@/core/shared/exceptions";

export class PostTitle {
    private constructor(private title: string) {
    }

    static create(value: string): PostTitle {
        if (!value) {
            throw new MissingParameterException("Post title cannot be empty");
        }
        return new PostTitle(value);
    }

    value(): string {
        return this.title;
    }
}