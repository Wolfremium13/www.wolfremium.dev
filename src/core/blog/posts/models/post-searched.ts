import {PostTitle} from "@/core/blog/shared/models/post-title";
import {PostSlug} from "@/core/blog/shared/models/post-slug";
import {PostDatePublished} from "@/core/blog/shared/models/post-date-published";

export class PostSearched {
    private constructor(
        private title: PostTitle,
        private slug: PostSlug,
        private date: PostDatePublished
    ) {
    }

    static create(
        givenTitle: string,
        givenSlug: string,
        givenDate: string
    ): PostSearched {
        return new PostSearched(PostTitle.create(givenTitle),
            PostSlug.create(givenSlug),
            PostDatePublished.create(givenDate));
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
}