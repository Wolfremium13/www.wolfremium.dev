import {PostManagement} from "@/core/blog/posts/use-case/post-management";
import {Serializer} from "@/core/blog/markdown/serializer";
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

export class PostsManagementController {
    constructor(
        private readonly postManagement: PostManagement,
        private readonly postAuth: PostAuthentication,
        private readonly serializer: Serializer
    ) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromRequest(request);
            await this.postAuth.authenticate(token);
            const data = await request.json();
            const post = Post.create(
                data.author,
                data.content,
                data.dateModified,
                data.datePublished,
                data.imageAlt,
                data.imageUrl,
                data.lang,
                data.shortDescription,
                data.slug,
                data.title,
                data.tags,
                (await this.serializer.serialize(data.content)).value()
            )
            await this.postManagement.save(post);
            return new Response(JSON.stringify({message: "Post created"}), {status: 201});
        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }

    async get(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromRequest(request);
            await this.postAuth.authenticate(token);
            const url = new URL(request.url);
            const slug = url.searchParams.get('slug');
            if (slug) {
                const post = await this.postManagement.get(PostSlug.create(slug));
                if (!post) {
                    throw new NotFoundException("Post not found");
                }
                return new Response(JSON.stringify(post), {status: 200});
            }
            const posts = await this.postManagement.all();
            return new Response(JSON.stringify(posts), {status: 200});

        } catch (e: unknown) {
            return this.handleErrors(e);
        }
    }

    async delete(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromRequest(request);
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

        return new Response(JSON.stringify({error: "Unknown error while management post"}), {status: 500});
    }
}