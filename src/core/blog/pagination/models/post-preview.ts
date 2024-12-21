import {PostImageUrl} from "@/core/blog/shared/models/post-image-url";
import {PostDatePublished} from "@/core/blog/shared/models/post-date-published";
import {PostSlug} from "@/core/blog/shared/models/post-slug";
import {PostTitle} from "@/core/blog/shared/models/post-title";
import {PostShortDescription} from "@/core/blog/shared/models/post-short-description";
import {PostImageAlt} from "@/core/blog/shared/models/post-image-alt";
import {PostTags} from "@/core/blog/shared/models/post-tags";

export class PostPreview {
    private constructor(
        private readonly title: PostTitle,
        private readonly slug: PostSlug,
        private readonly date: PostDatePublished,
        private readonly imageUrl: PostImageUrl,
        private readonly imageAlt: PostImageAlt
    ) {
    }

    static create(
        givenTitle: string,
        givenSlug: string,
        givenDate: string,
        givenImageUrl: string,
        givenImageAlt: string
    ): PostPreview {
        return new PostPreview(
            PostTitle.create(givenTitle),
            PostSlug.create(givenSlug),
            PostDatePublished.create(givenDate),
            PostImageUrl.create(givenImageUrl),
            PostImageAlt.create(givenImageAlt)
        );
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

    getImageAlt(): string {
        return this.imageAlt.value();
    }

    toJSON(): string {
        return JSON.stringify({
            title: this.title.value(),
            slug: this.slug.value(),
            date: this.date.value(),
            imageUrl: this.imageUrl.value(),
            imageAlt: this.imageAlt.value()
        });
    }
}