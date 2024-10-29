export interface Post {
    title: string;
    slug: string;
    date: string;
    preview: string;
    tags: string[];
    content: string | undefined;
    mdxSource: any | undefined;
}