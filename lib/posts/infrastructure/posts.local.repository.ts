import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { PostsRepository } from "../application/posts.repository";
import { Post } from "../domain/post";

export class PostsLocalRepository implements PostsRepository {
    private readonly postsDirectory = path.join(process.cwd(), "data", "posts");
    private readonly fileFormat = ".mdx";
    private readonly postsPerPage = 9;

    getTotalPages(): Promise<number> {
        const filenames = fs
            .readdirSync(this.postsDirectory)
            .filter((fn) => fn.endsWith(this.fileFormat));
        return new Promise((resolve) =>
            resolve(Math.ceil(filenames.length / this.postsPerPage))
        );
    }
    async getPaginatedPosts(pageNumber: number): Promise<Post[]> {
        const posts = await this.getPosts();
        const sortedPosts = posts.sort((a: Post, b: Post) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        const startIndex = (pageNumber - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return new Promise((resolve) =>
            resolve(sortedPosts.slice(startIndex, endIndex))
        );
    }
    async getPost(slug: string): Promise<Post | undefined> {
        const filePath = path.join(this.postsDirectory, `${slug}.mdx`);
        if (!fs.existsSync(filePath)) {
            return new Promise((resolve) => resolve(undefined));
        }
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);
        const mdxSource = await serialize(content);
        const post = {
            title: data.title,
            date: data.date,
            preview: data.preview,
            tags: data.tags,
            content,
            mdxSource,
        } as Post;
        return new Promise((resolve) => resolve(post));
    }
    async getAllFilePaths(): Promise<string[]> {
        const filenames = fs
            .readdirSync(this.postsDirectory)
            .filter((fn) => fn.endsWith(this.fileFormat))
            .map((filename) => {
                const fileNameWithoutExtension = filename.replace(
                    this.fileFormat,
                    ""
                );
                return path.join(this.postsDirectory, fileNameWithoutExtension);
            });
        return new Promise((resolve) => resolve(filenames));
    }
    async getPosts(): Promise<Post[]> {
        const filenames = fs
            .readdirSync(this.postsDirectory)
            .filter((fn) => fn.endsWith(this.fileFormat));
        const allPosts = filenames.map((filename) => {
            const filePath = path.join(this.postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);
            return {
                title: data.title,
                slug: filename.replace(this.fileFormat, ""),
                date: data.date,
                preview: data.preview,
                tags: data.tags,
            } as Post;
        });
        return new Promise((resolve) => resolve(allPosts));
    }
}
