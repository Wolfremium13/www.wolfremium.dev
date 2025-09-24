import {Metadata} from "next";
import {Section} from "@/app/shared/components/Section";
import {SerializedPost} from "../types/serialized-post";
import {PostManagementServiceFactory} from "@/app/api/admin/blog/posts/use-case/post-management-service-factory";
import {PostSlug} from "@/app/api/admin/blog/posts/models/blog/shared/models/post-slug";
import {notFound} from "next/navigation";
import dynamic from "next/dynamic";
import {serialize} from "next-mdx-remote/serialize";
import {SERVER_URL} from "@/app/api/server-url";

const MdxContent = dynamic(() => import('../components/MdxContent'), {ssr: false});

const BASE_URL = SERVER_URL.current;

export const revalidate = 172800;

export async function generateStaticParams() {
    const service = PostManagementServiceFactory.create();
    const posts = await service.all();
    return posts
        .filter((post) => post.isPublished())
        .map((post) => {
            return {slug: post.getSlug()}
        });
}

const getPost = async (slug: string): Promise<SerializedPost | null> => {
    const service = PostManagementServiceFactory.create();
    const post = await service.get(PostSlug.create(slug));
    if (!post || !post.isPublished()) {
        return null;
    }
    return {
        title: post.getTitle(),
        shortDescription: post.getShortDescription(),
        imageUrl: post.getImageUrl(),
        imageAlt: post.getImageAlt(),
        tags: post.getTags(),
        datePublished: post.getDatePublished(),
        content: post.getContent()
    }
}

export async function generateMetadata({params}: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug;
    const post = await getPost(slug);
    if (!post) {
        return notFound();
    }
    return {
        title: `Blog - ${post.title}`,
        description: post.shortDescription,
        keywords: post.tags.join(', '),
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${BASE_URL}/blog/posts/${slug}`
        },
        authors: {url: `${BASE_URL}`, name: 'Kevin Hierro'},
        openGraph: {
            title: `Blog - ${post.title}`,
            description: post.shortDescription,
            type: 'article',
            url: `${BASE_URL}/blog/posts/${slug}`,
            images: [{url: post.imageUrl}],
        },
    }
}

export default async function PostPage({params}: { params: { slug: string } }) {
    const post = await getPost(params.slug);
    if (!post) {
        return notFound();
    }
    const serializedContent = await serialize(post.content);
    const tagColors = [
        "bg-lightViolet",
        "bg-darkGreen",
        "bg-teal-800",
        "bg-indigo-800",
        "bg-blue-800",
        "bg-purple-800",
        "bg-pink-800",
    ];
    return (
        <div className={"md:mt-24 mt-12"}>
            <Section>
                <section className="markdown-body flex justify-center content-center w-full">
                    <div className="w-full p-2">
                        <h1>{post.title}</h1>
                        <div className="flex justify-between">
                            <div className="flex">
                                {post.tags.map((tag) => {
                                    const tagColor =
                                        tagColors[Math.floor(Math.random() * tagColors.length)];
                                    return (
                                        <div
                                            key={tag}
                                            className={`text-gray-50 ${tagColor} rounded-full px-2 py-1 text-xs font-bold mr-3`}
                                        >
                                            {tag}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-gray-500 text">
                                📅 {post.datePublished.split("T")[0]}
                            </div>
                        </div>
                        <div className="my-4"></div>
                        <MdxContent serializedContent={serializedContent}/>
                    </div>
                </section>
            </Section>
        </div>
    );
}