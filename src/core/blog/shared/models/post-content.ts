import {MissingParameterException} from "@/core/shared/exceptions";

export class PostContent {
    private constructor(private readonly content: string) {
    }

    static create(content: string): PostContent {
        if (!content) {
            throw new MissingParameterException('Post content is required');
        }
        return new PostContent(content);
    }

    value(): string {
        return this.content;
    }
}