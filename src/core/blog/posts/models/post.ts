import {PostAuthor} from "@/core/blog/shared/models/post-author";
import {PostContent} from "@/core/blog/shared/models/post-content";
import {PostDateModified} from "@/core/blog/shared/models/post-date-modified";
import {PostDatePublished} from "@/core/blog/shared/models/post-date-published";
import {PostImageAlt} from "@/core/blog/shared/models/post-image-alt";
import {PostImageUrl} from "@/core/blog/shared/models/post-image-url";
import {PostLang} from "@/core/blog/shared/models/post-lang";
import {PostShortDescription} from "@/core/blog/shared/models/post-short-description";
import {PostSlug} from "@/core/blog/shared/models/post-slug";
import {PostTitle} from "@/core/blog/shared/models/post-title";
import {PostTags} from "@/core/blog/shared/models/post-tags";
import {SerializedPost} from "@/core/blog/markdown/models/serialized.post";

export class Post {
    private constructor(
        private author: PostAuthor,
        private content: PostContent,
        private dateModified: PostDateModified,
        private datePublished: PostDatePublished,
        private imageAlt: PostImageAlt,
        private imageUrl: PostImageUrl,
        private lang: PostLang,
        private shortDescription: PostShortDescription,
        private slug: PostSlug,
        private title: PostTitle,
        private tags: PostTags,
        private serializedPost: SerializedPost
    ) {
    }

    static create(
        givenAuthor: string,
        givenContent: string,
        givenDateModified: string,
        givenDatePublished: string,
        givenImageAlt: string,
        givenImageUrl: string,
        givenLang: string,
        givenShortDescription: string,
        givenSlug: string,
        givenTitle: string,
        givenTags: string[],
        givenSerializedPost: string
    ): Post {
        return new Post(PostAuthor.create(givenAuthor),
            PostContent.create(givenContent),
            PostDateModified.create(givenDateModified),
            PostDatePublished.create(givenDatePublished),
            PostImageAlt.create(givenImageAlt),
            PostImageUrl.create(givenImageUrl),
            PostLang.create(givenLang),
            PostShortDescription.create(givenShortDescription),
            PostSlug.create(givenSlug),
            PostTitle.create(givenTitle),
            PostTags.create(givenTags),
            SerializedPost.create(givenSerializedPost));
    }

    getAuthor(): string {
        return this.author.value();
    }

    getContent(): string {
        return this.content.value();
    }

    getDateModified(): string {
        return this.dateModified.value();
    }

    getDatePublished(): string {
        return this.datePublished.value();
    }

    getImageAlt(): string {
        return this.imageAlt.value();
    }

    getImageUrl(): string {
        return this.imageUrl.value();
    }

    getLang(): string {
        return this.lang.value();
    }

    getShortDescription(): string {
        return this.shortDescription.value();
    }

    getSlug(): string {
        return this.slug.value();
    }

    getTitle(): string {
        return this.title.value();
    }

    getTags(): string[] {
        return this.tags.value();
    }

    getSerializedPost(): SerializedPost {
        return this.serializedPost;
    }
}