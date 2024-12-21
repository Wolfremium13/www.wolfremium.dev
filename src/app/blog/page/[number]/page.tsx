import {Metadata} from 'next'
import {Section} from "@/core/shared/ui/components/Section";
import {PaginationNavbar} from "@/core/blog/pagination/ui/components/PaginationNavbar";
import {PostPreviewCard} from "@/core/blog/pagination/ui/components/PostPreview";
import {PostPreview} from "@/core/blog/pagination/ui/types/post-preview";


const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : 'http://localhost:3000';

export const dynamicParams = false;
export async function generateStaticParams() {
    const res = await fetch(`${BASE_URL}/api/posts/pagination?page=1`);
    if (!res.ok) {
        throw new Error('No se pudo obtener los datos para generar las rutas estáticas.');
    }
    const data = await res.json();
    const { totalPages } = data;
    return Array.from({ length: totalPages }, (_, i) => ({
        number: (i + 1).toString()
    }));
}

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
    const page = parseInt(params.number, 10);
    return {
        title: `Blog - ${!isNaN(page) ? page.toString() : "Desconocida"}`,
        description: "Lista de artículos publicados en nuestro blog.",
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${BASE_URL}/blog/page/${page}`
        }
    }
}

export default async function BlogPage({params}: { params: { number: string } }) {
    const currentPage = parseInt(params.number, 10);
    let totalPages = 1;
    let posts: PostPreview[] = []
    try {
        const response = await fetch(`${BASE_URL}/api/posts/pagination?page=${currentPage}`);
        const data = await response.json();
        totalPages = data.totalPages;
        posts = data.posts.map((post: string) => JSON.parse(post));
    } catch (e: unknown){
        if (e instanceof Error) {
            console.error(e);
        }
    }
    return (
        <div className={"md:mt-24 mt-12"}>
            <Section>
                <div className="container mx-auto px-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post: PostPreview) => (
                        <PostPreviewCard key={post.slug} post={post}/>
                    ))}
                </div>
                <PaginationNavbar currentPage={currentPage} totalPages={totalPages}/>
            </Section>
        </div>

    );
}
