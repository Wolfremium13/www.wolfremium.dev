import {PostManagement} from "@/core/blog/posts/use-case/post-management";
import {NotFoundException} from "@/core/shared/exceptions";
import {PostSlug} from "@/core/blog/shared/models/post-slug";

export class PostsController {
    constructor(
        private readonly postManagement: PostManagement
    ) {
    }

    async get(request: Request): Promise<Response> {
        try {
            const url = new URL(request.url);
            const slug = url.searchParams.get('slug');
            if (slug) {
                const postSlug = PostSlug.create(slug);
                const post = await this.postManagement.get(postSlug);
                if (!post) {
                    throw new NotFoundException("Post not found");
                }
                return new Response(JSON.stringify({post: post.toJSON()}), {status: 200});
            }
            const posts = (await this.postManagement.all())
                .filter(post => post.isPublished())
                .sort(
                    (a, b) => new Date(b.getDatePublished()).getTime() - new Date(a.getDatePublished()).getTime())
                .map(post => post.toJSON());
            return new Response(JSON.stringify({posts}), {status: 200});
        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }

    private handleErrors(e: unknown): Response {
        // TODO: Implement a better error handling
        if (e instanceof NotFoundException) {
            return new Response(JSON.stringify({message: e.message}), {status: 404});
        }
        return new Response(JSON.stringify({message: "Internal server error"}), {status: 500});
    }
}