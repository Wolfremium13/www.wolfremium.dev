export class SerializedPost {
    private constructor(private readonly mdxSource: string) {
    }

    static create(mdxSource: string): SerializedPost {
        return new SerializedPost(mdxSource);
    }

    value(): string {
        return this.mdxSource;
    }
}