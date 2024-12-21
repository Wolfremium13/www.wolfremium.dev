import {PostRepository} from "@/core/blog/posts/repository/post-repository";
import {Logger} from "@/core/shared/logging/logger";
import {PostSlug} from "../../shared/models/post-slug";
import {Post} from "../models/post";
import {DatabaseException} from "@/core/shared/exceptions";
import {FirebaseAdminAdapter} from "@/core/shared/firebase/firebase-admin-adapter";


export class FirebasePostRepository implements PostRepository {
    constructor(
        private readonly adapter: FirebaseAdminAdapter,
        private readonly logger: Logger) {
    }

    async save(post: Post): Promise<void> {
        try {
            const firestore = this.adapter.firestore;
            await firestore.collection("posts").doc(post.getSlug()).set({
                author: post.getAuthor(),
                content: post.getContent(),
                dateModified: post.getDateModified(),
                datePublished: post.getDatePublished(),
                imageAlt: post.getImageAlt(),
                imageUrl: post.getImageUrl(),
                lang: post.getLang(),
                shortDescription: post.getShortDescription(),
                title: post.getTitle(),
                tags: post.getTags(),
                published: post.isPublished()
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error while saving post ${post.getSlug()}: ${error.message}`);
                throw new DatabaseException("Error while saving post");
            }
            throw new Error("Unknown error while saving post");
        }
    }

    async findBySlug(slug: PostSlug): Promise<Post | null> {
        try {
            const firestore = this.adapter.firestore;
            const docRef = firestore.collection("posts").doc(slug.value());
            const doc = await docRef.get();
            if (doc.exists) {
                const data = doc.data() as any;
                return Post.create(
                    data.author,
                    data.content,
                    data.dateModified,
                    data.datePublished,
                    data.imageAlt,
                    data.imageUrl,
                    data.lang,
                    data.shortDescription,
                    slug.value(),
                    data.title,
                    data.tags,
                    data.published
                );
            }
            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error while finding post ${slug.value()}: ${error.message}`);
                throw new DatabaseException("Error while finding post");
            }
            throw new Error("Unknown error while finding post");
        }


    }

    async findAll(): Promise<Post[]> {
        try {
            const firestore = this.adapter.firestore;
            const postsCollection = firestore.collection("posts");
            const postsSnapshot = await postsCollection.get();
            const posts: Post[] = [];
            postsSnapshot.forEach((doc) => {
                const data = doc.data();
                posts.push(Post.create(
                    data.author,
                    data.content,
                    data.dateModified,
                    data.datePublished,
                    data.imageAlt,
                    data.imageUrl,
                    data.lang,
                    data.shortDescription,
                    doc.id,
                    data.title,
                    data.tags,
                    data.published
                ));
            });
            return posts;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error while finding all posts: ${error.message}`);
                throw new DatabaseException("Error while finding all posts");
            }
            throw new Error("Unknown error while finding all posts");
        }

    }

    async delete(slug: PostSlug): Promise<void> {
        try {
            const firestore = this.adapter.firestore;
            await firestore.collection("posts").doc(slug.value()).delete();
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error while deleting post ${slug.value()}: ${error.message}`);
                throw new DatabaseException(`Error while deleting post with slug: ${slug.value()}`);
            }
            throw new Error("Unknown error while deleting slug");
        }
    }
}