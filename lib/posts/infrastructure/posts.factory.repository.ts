import { PostsRepository } from "@/lib/posts/application/posts.repository";
import { PostsLocalRepository } from "./posts.local.repository";

export class PostsFactoryRepository {
    static getInstance(type: string): PostsRepository {
        switch (type) {
            default:
                return new PostsLocalRepository()
        }
    }
}