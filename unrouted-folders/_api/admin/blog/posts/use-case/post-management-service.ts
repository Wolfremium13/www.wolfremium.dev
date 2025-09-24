import {PostManagement} from "@/app/api/admin/blog/posts/use-case/post-management";
import {PostRepository} from "@/app/api/admin/blog/posts/repository/post-repository";
import {Post} from "@/app/api/admin/blog/posts/models/post";
import {PostSlug} from "@/app/api/admin/blog/posts/models/blog/shared/models/post-slug";
import {NotFoundException} from "@/core/exceptions/exceptions";

export class PostManagementService implements PostManagement {
    constructor(private readonly postRepository: PostRepository) {
    }

    save(post: Post): Promise<void> {
        return this.postRepository.save(post);
    }

    delete(slug: PostSlug): Promise<void> {
        if (!this.postRepository.findBySlug(slug)) {
            throw new NotFoundException('Post not found');
        }
        return this.postRepository.delete(slug);
    }

    get(slug: PostSlug): Promise<Post | null> {
        return this.postRepository.findBySlug(slug);
    }

    all(): Promise<Post[]> {
        return this.postRepository.findAll();
    }

    async update(post: Post): Promise<Post> {
        await this.postRepository.save(post);
        return post;
    }
}