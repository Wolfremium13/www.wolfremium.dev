import {PostPagination} from "@/core/blog/pagination/use-case/post-pagination";
import {ClientSideException, ServerSideException} from "@/core/shared/exceptions";
import {PageNumber} from "@/core/blog/pagination/models/page-number";

export class PostsPaginationController {
    constructor(private readonly postPaginationService: PostPagination) {
    }

    async get(request: Request): Promise<Response> {
        try {
            const url = new URL(request.url);
            const searchPage = url.searchParams.get('page');
            if (!searchPage) {
                return new Response(JSON.stringify({message: "Page number is required"}), {status: 400});
            }
            const pageNumber = PageNumber.create(parseInt(searchPage, 10));
            const paginatedPosts = await this.postPaginationService.getPaginatedPosts(pageNumber);
            return new Response(JSON.stringify(paginatedPosts.toJSON()), {status: 200});
        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }


    private async handleErrors(e: unknown): Promise<Response> {
        if (e instanceof ClientSideException) {
            return new Response(JSON.stringify({error: e.message}), {status: 400});
        }

        if (e instanceof ServerSideException) {
            return new Response(JSON.stringify({error: e.message}), {status: 500});
        }

        if (e instanceof Error) {
            return new Response(JSON.stringify({error: e.message, stackTrace: e.stack}), {status: 500});
        }

        return new Response(JSON.stringify({error: "Unknown error while processing request"}), {status: 500});
    }
}