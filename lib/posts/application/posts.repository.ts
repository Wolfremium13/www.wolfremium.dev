import {Post} from "@/lib/posts/domain/post";

export type PostFileParams = {locale: string, postName: string}

export interface PostsRepository {
    getTotalPages(): Promise<number>;
    getPaginatedPosts(pageNumber: number): Promise<Post[]>;
    getPosts: () => Promise<Post[]>
    getPost: (slug: string) => Promise<Post | undefined>
    getAllFilePaths: () => Promise<string[]>
}