import {PostPreview} from "./post-preview";

export type PaginatedPosts = {
    posts: PostPreview[];
    page: number;
    totalPages: number;
}