import {PostPreview} from "@/core/blog/pagination/ui/types/post-preview";

export type PaginatedPosts = {
    posts: PostPreview[];
    page: number;
    totalPages: number;
}