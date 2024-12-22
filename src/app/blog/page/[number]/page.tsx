import {Metadata} from 'next'
import {Section} from "@/app/shared/components/Section";
import {PaginationNavbar} from "@/app/blog/page/components/PaginationNavbar";
import {PostPreviewCard} from "@/app/blog/page/components/PostPreview";
import {PostPreview} from "@/app/blog/page/types/post-preview";
import {PostPaginationFactory} from "@/app/api/public/posts/pagination/use-case/post-pagination-factory";
import {SERVER_URL} from "@/app/api/server-url";
import {PageNumber} from "@/app/api/public/posts/models/page-number";
import {notFound} from "next/navigation";

const BASE_URL = SERVER_URL.current;
export const dynamicParams = false;

type PaginatedPosts = {
    posts: PostPreview[];
    totalPages: number;
}

async function getPaginatedPosts(pageNumber: PageNumber): Promise<PaginatedPosts> {
    const service = PostPaginationFactory.create();
    const totalPages = await service.getTotalPages();
    const posts = await service.getPaginatedPosts(pageNumber);
    return {posts, totalPages: totalPages.value()};
}

export async function generateStaticParams() {
    const service = PostPaginationFactory.create();
    const totalPages = await service.getTotalPages();
    return Array.from({length: totalPages.value()}, (_, i) => ({
        number: (i + 1).toString()
    }));
}

export async function generateMetadata({params}: { params: { number: string } }): Promise<Metadata> {
    const pageNumber = parseInt(params.number, 10);
    return {
        title: `Blog - ${!isNaN(pageNumber) ? pageNumber : "Desconocida"}`,
        description: "Lista de artículos publicados en nuestro blog.",
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${BASE_URL}/blog/page/${pageNumber}`
        }
    }
}

export default async function BlogPage({params}: { params: { number: string } }) {
    let paginatedPosts: PaginatedPosts;
    let currentPage = 1;
    try {
        currentPage = parseInt(params.number, 10);
        paginatedPosts = await getPaginatedPosts(PageNumber.create(currentPage));
        if (currentPage > paginatedPosts.totalPages) {
            return notFound();
        }
    } catch (e) {
        return notFound();
    }

    return (
        <div className={"md:mt-24 mt-12"}>
            <Section>
                <div className="container mx-auto p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedPosts.posts.map((post: PostPreview) => (
                        <PostPreviewCard key={post.slug} post={post}/>
                    ))}
                </div>
                <PaginationNavbar currentPage={currentPage} totalPages={paginatedPosts.totalPages}/>
            </Section>
        </div>
    );
}
