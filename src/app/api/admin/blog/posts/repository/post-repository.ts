import {PostSlug} from "@/app/api/admin/blog/posts/models/blog/shared/models/post-slug";
import {Post} from "@/app/api/admin/blog/posts/models/post";

export interface PostRepository {
    save(post: Post): Promise<void>;
    findBySlug(slug: PostSlug): Promise<Post | null>;
    findAll(): Promise<Post[]>;
    delete(post: PostSlug): Promise<void>;
}