import {PostManagement} from "@/core/blog/posts/use-case/post-management";
import {PostAuthentication} from "@/core/blog/posts/use-case/post-authentication";
import {
    AuthenticationException,
    ClientSideException,
    NotFoundException,
    ServerSideException
} from "@/core/shared/exceptions";
import {JwtToken} from "@/core/shared/auth/models/jwt-token";
import {Post} from "@/core/blog/posts/models/post";
import {PostSlug} from "@/core/blog/shared/models/post-slug";
import {TimeManager} from "@/core/shared/time-manager/time-manager";
import {PostContent} from "@/core/blog/shared/models/post-content";

export class PostsManagementController {
    constructor(
        private readonly postManagement: PostManagement,
        private readonly postAuth: PostAuthentication,
        private readonly timeManager: TimeManager
    ) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromAuthRequest(request);
            await this.postAuth.authenticate(token);
            const data = await request.json();
            const post = await this.MapToPost(data);
            await this.postManagement.save(post);
            return new Response(JSON.stringify({message: "Post created"}), {status: 201});
        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }

    async get(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromAuthRequest(request);
            await this.postAuth.authenticate(token);
            const url = new URL(request.url);
            const slug = url.searchParams.get('slug');
            if (slug) {
                const post = await this.postManagement.get(PostSlug.create(slug));
                if (!post) {
                    throw new NotFoundException("Post not found");
                }
                return new Response(post.toJSON(), {status: 200});
            }
            const posts = await this.postManagement.all();
            return new Response(JSON.stringify(posts.map(post => post.toJSON())), {status: 200});

        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }

    async delete(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromAuthRequest(request);
            await this.postAuth.authenticate(token);
            const url = new URL(request.url);
            const slug = url.searchParams.get('slug');
            if (!slug) {
                throw new ClientSideException("Slug is required");
            }
            await this.postManagement.delete(PostSlug.create(slug));
            return new Response(JSON.stringify({message: "Post deleted"}), {status: 200});
        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }

    async patch(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromAuthRequest(request);
            await this.postAuth.authenticate(token);
            const {post, slug} = await request.json();
            const givenPost = await this.MapToPost(post);
            const updatePost = await this.postManagement.update(givenPost);
            return new Response(JSON.stringify(updatePost.toJSON()), {status: 200});
        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }

    private async MapToPost(data: any) {
        const author = "Kevin Hierro";
        const lang = "es";
        return Post.create(
            author,
            data.content,
            this.timeManager.now().toString(),
            data.datePublished,
            data.imageAlt,
            data.imageUrl,
            lang,
            data.shortDescription,
            data.slug,
            data.title,
            data.tags,
            data.published
        );
    }

    private async handleErrors(e: unknown): Promise<Response> {
        if (e instanceof AuthenticationException) {
            return new Response(JSON.stringify({error: e.message}), {status: 401});
        }

        if (e instanceof NotFoundException) {
            return new Response(JSON.stringify({error: e.message}), {status: 404});
        }

        if (e instanceof ClientSideException) {
            return new Response(JSON.stringify({error: e.message}), {status: 400});
        }

        if (e instanceof ServerSideException) {
            return new Response(JSON.stringify({error: e.message}), {status: 500});
        }

        if (e instanceof Error) {
            return new Response(JSON.stringify({error: e.message, stackTrace: e.stack}), {status: 500});
        }

        return new Response(JSON.stringify({error: "Unknown error while management post"}), {status: 500});
    }
}