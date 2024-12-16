import {PostRepository} from "@/core/blog/posts/repository/post.repository";
import {FirebaseAdapter} from "@/core/shared/firebase/firebase-adapter";
import {Logger} from "@/core/shared/logging/logger";
import {PostSlug} from "../../shared/models/post-slug";
import {Post} from "../models/post";
import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    getDoc,
} from "@firebase/firestore";
import {DatabaseException} from "@/core/shared/exceptions";


export class FirebasePostRepository implements PostRepository {
    constructor(
        private readonly adapter: FirebaseAdapter,
        private readonly logger: Logger) {
    }

    async save(post: Post): Promise<void> {
        try {
            const firestore = this.adapter.firestore;
            await setDoc(doc(firestore, "posts", post.getSlug()), {
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
                serializedPost: post.getSerializedPost(),
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
            const docRef = doc(firestore, "posts", slug.value());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
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
                    data.serializedPost
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
            const postsCollection = collection(firestore, "posts");
            const postsSnapshot = await getDocs(postsCollection);
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
                    data.serializedPost
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

    delete(post: PostSlug): Promise<void> {
        try {
            const firestore = this.adapter.firestore;
            const docRef = doc(firestore, "posts", post.value());
            return deleteDoc(docRef);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error while deleting post ${post.value()}: ${error.message}`);
                throw error;
            }
            throw new Error("Unknown error while deleting post");
        }
    }
}