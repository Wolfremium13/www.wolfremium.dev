import {MissingParameterException} from "@/core/shared/exceptions";

export class PostImageUrl {
    private constructor(private readonly url: string) {
    }

    static create(url: string): PostImageUrl {
        if (!url) {
            throw new MissingParameterException('Post image URL is required');
        }
        return new PostImageUrl(url);
    }

    value(): string {
        return this.url;
    }
}