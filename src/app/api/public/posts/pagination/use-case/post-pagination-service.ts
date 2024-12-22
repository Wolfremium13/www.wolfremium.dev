import {PostPagination} from "@/app/api/public/posts/pagination/use-case/post-pagination";
import {PostRepository} from "@/app/api/admin/blog/posts/repository/post-repository";
import {TotalPages} from "@/app/api/public/posts/models/total-pages";
import {PageNumber} from "@/app/api/public/posts/models/page-number";
import {PostPreview} from "@/app/blog/page/types/post-preview";

export class PostPaginationService implements PostPagination {
    private readonly postsPerPage = 9;

    constructor(private readonly postRepository: PostRepository) {
    }

    async getPaginatedPosts(pageNumber: PageNumber): Promise<PostPreview[]> {
        const startIndex = (pageNumber.value() - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return (await this.postRepository.findAll())
            .filter((post) => post.isPublished())
            .slice(startIndex, endIndex)
            .map(post => {
                return {
                    title: post.getTitle(),
                    slug: post.getSlug(),
                    date: post.getDatePublished(),
                    imageUrl: post.getImageUrl(),
                    imageAlt: post.getImageAlt(),
                };
            });
    }

    async getTotalPages(): Promise<TotalPages> {
        const allPosts = await this.postRepository.findAll();
        return TotalPages.create(Math.ceil(allPosts.length / this.postsPerPage));
    }
}