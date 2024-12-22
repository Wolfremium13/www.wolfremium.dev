export class PostTags {
    private constructor(private tags: string[]) {
    }

    static create(value: string[]): PostTags {
        return new PostTags(value);
    }

    value(): string[] {
        return this.tags;
    }
}