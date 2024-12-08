export class PostImageAlt {
    private constructor(private readonly alt: string) {
    }

    static create(alt: string): PostImageAlt {
        return new PostImageAlt(alt);
    }

    value(): string {
        return this.alt;
    }
}