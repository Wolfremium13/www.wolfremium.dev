import {Title} from "@/core/shared/ui/components/Title";
import {EditPost} from "@/core/blog/posts/ui/components/EditPost";
import {Post} from "@/core/blog/posts/ui/types/post";
import {cookies} from 'next/headers'

interface Props {
    params: {
        slug: string
    }
}

const getPost = async (slug: string): Promise<Post> => {
    const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/management?slug=${slug}`;
    const response = await fetch(url, {
        cache: "no-store",
        credentials: "include",
        headers: {
            "Cookie": cookies().getAll().map(cookie => `${cookie.name}=${cookie.value}`).join("; ")
        }})

    if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.error)
    }

    return await response.json()
}

    export default async function EditPostPage(props: Props) {
        const post = await getPost(props.params.slug)

        return (
            <div className="flex flex-col gap-4 mt-8">
                <header>
                    <Title as="h1" size="lg">Blog</Title>
                </header>
                <section>
                    <EditPost post={post}/>
                </section>
            </div>
        )
    }

    export const revalidate = 0
    export const dynamic = "force-dynamic"