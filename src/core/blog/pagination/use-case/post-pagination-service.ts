import {PostPagination} from "@/core/blog/pagination/use-case/post-pagination";
import {PostRepository} from "@/core/blog/posts/repository/post-repository";
import {PaginatedPosts} from "@/core/blog/pagination/models/paginated-posts";
import {TotalPages} from "@/core/blog/pagination/models/total-pages";
import {PageNumber} from "@/core/blog/pagination/models/page-number";
import {PostPreview} from "@/core/blog/pagination/models/post-preview";

export class PostPaginationService implements PostPagination {
    private readonly postsPerPage = 9;
    constructor(private readonly postRepository: PostRepository) {
    }

    async getPaginatedPosts(pageNumber: PageNumber): Promise<PaginatedPosts> {
        const allPosts = await this.postRepository.findAll();
        const startIndex = (pageNumber.value() - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const selectedPosts = allPosts.slice(startIndex, endIndex);
        const previewPosts = selectedPosts.map((post) => {
            return PostPreview.create(
                post.getTitle(),
                post.getSlug(),
                post.getDatePublished(),
                post.getImageUrl(),
                post.getImageAlt()
            )
        });
        const totalPages = TotalPages.create(Math.ceil(allPosts.length / this.postsPerPage));
        return PaginatedPosts.create(previewPosts, pageNumber, totalPages);
    }
}