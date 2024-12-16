import {PostImageUrl} from "@/core/blog/shared/models/post-image-url";
import {PostDatePublished} from "@/core/blog/shared/models/post-date-published";
import {PostSlug} from "@/core/blog/shared/models/post-slug";
import {PostTitle} from "@/core/blog/shared/models/post-title";

export class PostPreview {
    private constructor(
        private title: PostTitle,
        private slug: PostSlug,
        private date: PostDatePublished,
        private imageUrl: PostImageUrl
    ) {
    }

    static create(
        givenTitle: string,
        givenSlug: string,
        givenDate: string,
        givenImageUrl: string
    ): PostPreview {
        return new PostPreview(
            PostTitle.create(givenTitle),
            PostSlug.create(givenSlug),
            PostDatePublished.create(givenDate),
            PostImageUrl.create(givenImageUrl));
    }

    getTitle(): string {
        return this.title.value();
    }

    getSlug(): string {
        return this.slug.value();
    }

    getDate(): string {
        return this.date.value();
    }

    getImageUrl(): string {
        return this.imageUrl.value();
    }
}