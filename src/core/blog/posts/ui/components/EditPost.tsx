"use client"
import React, {useState} from "react"
import {Post} from "../types/post"
import {usePosts} from "@/core/blog/posts/ui/hooks/use.posts";
import {useRouter} from "next/navigation";
import {Title} from "@/core/shared/ui/components/Title";
import {PostForm} from "@/core/blog/posts/ui/components/PostForm";
import {Button} from "@/core/shared/ui/components/Button";
import {Section} from "@/core/shared/ui/components/Section";

interface Props {
    post: Post
}

export const EditPost: React.FC<Props> = ({post}) => {
    const {posts, isLoading, update} = usePosts()
    const [postToEdit, setPostToEdit] = useState<Post | undefined>(post)
    const {push, refresh} = useRouter()

    const isSaveBlocked = postToEdit === undefined || JSON.stringify(post) === JSON.stringify(postToEdit)

    const handleSave = async () => {
        if (postToEdit) {
            await update(post.slug, postToEdit)
            refresh()
        }
    }

    const handleBack = () => {
        push("/admin/posts-management")
    }

    if (isLoading) {
        return <div>Cargando...</div>
    }

    return (
        <Section>
            <div className="relative">
                <div className="mb-4">
                    <Title as="h2" size="md">Edición de un post</Title>
                </div>
                <PostForm
                    isEditing={Boolean(post.dateModified)}
                    post={postToEdit}
                    posts={posts ?? []}
                    onChange={(editedPost) => setPostToEdit(editedPost)}
                />
                <footer className="flex justify-between items-center sticky bottom-2 p-2 gap-2 my-4 mx-auto w-full lg:w-1/2
                         bg-primary-dark shadow rounded z-20"
                >
                    <p className="text-neutral-light text-sm px-2">
                        Los campos marcados con <span className="text-alert-dark">*</span> son obligatorios<br/>
                    </p>
                    <div className="flex gap-2">
                        <Button color="neutral" onClick={handleBack}>
                            Volver al listado
                        </Button>
                        <Button color="primary" onClick={handleSave} disabled={isSaveBlocked}>
                            Guardar
                        </Button>
                    </div>
                </footer>
            </div>
        </Section>
    )
}

