import {PaginatedPosts} from "@/core/blog/pagination/models/paginated-posts";
import {PageNumber} from "@/core/blog/pagination/models/page-number";
import {TotalPages} from "@/core/blog/pagination/models/total-pages";

export interface PostPagination {
    getPaginatedPosts(pageNumber: PageNumber): Promise<PaginatedPosts>;
}