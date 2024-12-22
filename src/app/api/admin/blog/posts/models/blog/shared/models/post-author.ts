import {MissingParameterException} from "@/core/exceptions/exceptions";

export class PostAuthor {
    private constructor(private readonly author: string) {
    }

    static create(author: string): PostAuthor {
        if (!author) {
            throw new MissingParameterException('Post author is required');
        }
        return new PostAuthor(author);
    }

    value(): string {
        return this.author;
    }
}