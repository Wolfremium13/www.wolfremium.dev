import {PageNumber} from "@/core/blog/pagination/models/page-number";
import {PostPreview} from "@/core/blog/pagination/models/post-preview";
import {TotalPages} from "@/core/blog/pagination/models/total-pages";

export class PaginatedPosts {

    private constructor(
        private readonly posts: PostPreview[],
        public page: PageNumber,
        public totalPages: TotalPages
    ) {}

    static create(
        posts: PostPreview[],
        page: PageNumber,
        totalPages: TotalPages
    ): PaginatedPosts {
        return new PaginatedPosts(posts, page, totalPages);
    }

    getPosts(): PostPreview[] {
        return this.posts;
    }

    getPage(): PageNumber {
        return this.page;
    }

    getTotalPages(): TotalPages {
        return this.totalPages;
    }

    toJSON() {
        return {
            posts: this.posts.map(post => post.toJSON()),
            page: this.page.value(),
            totalPages: this.totalPages.value()
        };
    }
}