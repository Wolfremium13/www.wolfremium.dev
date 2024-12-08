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
        private title: PostTitle
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
        givenTitle: string
    ): Post {
        const author = PostAuthor.create(givenAuthor);
        const content = PostContent.create(givenContent);
        const dateModified = PostDateModified.create(givenDateModified);
        const datePublished = PostDatePublished.create(givenDatePublished);
        const imageAlt = PostImageAlt.create(givenImageAlt);
        const imageUrl = PostImageUrl.create(givenImageUrl);
        const lang = PostLang.create(givenLang);
        const shortDescription = PostShortDescription.create(givenShortDescription);
        const slug = PostSlug.create(givenSlug);
        const title = PostTitle.create(givenTitle);

        return new Post(author, content, dateModified, datePublished, imageAlt, imageUrl, lang, shortDescription, slug, title);
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
}