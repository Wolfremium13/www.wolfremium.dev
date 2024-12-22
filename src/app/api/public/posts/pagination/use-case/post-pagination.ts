import {PageNumber} from "@/app/api/public/posts/models/page-number";
import {TotalPages} from "@/app/api/public/posts/models/total-pages";
import {PostPreview} from "@/app/blog/page/types/post-preview";

export interface PostPagination {
    getPaginatedPosts(pageNumber: PageNumber): Promise<PostPreview[]>;
    getTotalPages(): Promise<TotalPages>
}