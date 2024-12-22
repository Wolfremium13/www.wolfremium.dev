import useSWR from "swr"
import {Post} from "@/app/admin/blog/types/post"
import {useState} from "react"
import {PostsAdminUrl} from "@/app/api/admin/blog/posts/controller/posts-admin-url";

interface HookResponse {
    posts: Post[]
    isLoading: boolean
    error: string | undefined
    create: (post: Post) => Promise<void>
    update: (slug: Post["slug"], post: Post) => Promise<void>
    deletePost: (slug: Post["slug"]) => Promise<void>
}

const POSTS_API_URL = PostsAdminUrl.relative

const getPosts = async () => {
    const response = await fetch(POSTS_API_URL)
    if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message)
    }
    const data: Post[] = (await response.json()).map((post: string) => JSON.parse(post))
    return data
}

export const usePosts = (): HookResponse => {
    const {data: posts, mutate, error, isLoading: isFetching} = useSWR("fetch-posts", getPosts, {
        initialData: [],
        fallbackData: []
    })
    const [isLoading, setIsLoading] = useState(false)

    const create = async (post: Post) => {
        setIsLoading(true)
        const response = await fetch(POSTS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post),
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.message || "Failed to create a post")
        }

        const createdPost = await response.json()
        const updatedPosts = [...posts, createdPost]

        await mutate(updatedPosts)
        setIsLoading(false)
    }

    const update = async (slug: Post["slug"], post: Post) => {
        setIsLoading(true)
        const response = await fetch(POSTS_API_URL, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({slug, post}),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.error || "Failed to update post")
        }

        const updatedPost = await response.json()
        await mutate((currentPosts) =>
            currentPosts?.map((post) => (post.slug === slug ? { ...post, ...updatedPost } : post))
        );
        setIsLoading(false)
    }

    const deletePost = async (slug: Post["slug"]) => {
        setIsLoading(true)
        const response = await fetch(`${POSTS_API_URL}?slug=${slug}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.error || "Failed to delete post")
        }
        await mutate((currentPosts) => currentPosts?.filter((post) => post.slug !== slug))
        setIsLoading(false)
    }

    return {
        posts,
        isLoading: isFetching || isLoading,
        error: error?.message,
        create,
        update,
        deletePost
    }
}
