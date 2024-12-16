import {PostSlug} from "@/core/blog/shared/models/post-slug";
import {Post} from "@/core/blog/posts/models/post";

export interface PostRepository {
    save(post: Post): Promise<void>;
    findBySlug(slug: PostSlug): Promise<Post | null>;
    findAll(): Promise<Post[]>;
    delete(post: PostSlug): Promise<void>;
}