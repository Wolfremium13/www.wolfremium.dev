import {PostPreview} from "@/app/blog/page/types/post-preview";

export type PaginatedPosts = {
    posts: PostPreview[];
    page: number;
    totalPages: number;
}