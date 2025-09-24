import {PostManagement} from "@/app/api/admin/blog/posts/use-case/post-management";
import {PostAuthentication} from "@/app/api/admin/blog/posts/use-case/post-authentication";
import {ClientSideException, NotFoundException} from "@/core/exceptions/exceptions";
import {JwtToken} from "@/core/auth/models/jwt-token";
import {Post} from "@/app/api/admin/blog/posts/models/post";
import {PostSlug} from "@/app/api/admin/blog/posts/models/blog/shared/models/post-slug";
import {TimeManager} from "@/core/time-manager/time-manager";
import {httpExceptionsHandler} from "@/core/exceptions/http-exceptions-handler";

export class PostsAdminController {
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
            return httpExceptionsHandler(e);
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
            return httpExceptionsHandler(e);
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
            return httpExceptionsHandler(e);
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
            return httpExceptionsHandler(e);
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
}