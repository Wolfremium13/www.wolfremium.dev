import {Post} from "@/core/blog/posts/models/post";
import {PostSlug} from "@/core/blog/shared/models/post-slug";

export interface PostManagement {
    all(): Promise<Post[]>;
    get(slug: PostSlug): Promise<Post | null>;
    save(post: Post): Promise<void>;
    delete(slug: PostSlug): Promise<void>;
}