import {Post} from "@/app/api/admin/blog/posts/models/post";
import {PostSlug} from "@/app/api/admin/blog/posts/models/blog/shared/models/post-slug";

export interface PostManagement {
    all(): Promise<Post[]>;
    get(slug: PostSlug): Promise<Post | null>;
    save(post: Post): Promise<void>;
    delete(slug: PostSlug): Promise<void>;
    update(post: Post): Promise<Post>;
}