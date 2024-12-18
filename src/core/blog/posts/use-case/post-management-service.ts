import {PostManagement} from "@/core/blog/posts/use-case/post-management";
import {PostRepository} from "@/core/blog/posts/repository/post-repository";
import {Post} from "@/core/blog/posts/models/post";
import {PostSlug} from "../../shared/models/post-slug";
import {ClientSideException, NotFoundException} from "@/core/shared/exceptions";

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