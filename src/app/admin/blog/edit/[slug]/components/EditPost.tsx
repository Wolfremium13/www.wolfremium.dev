"use client"
import React, {useState} from "react"
import {Post} from "@/app/admin/blog/types/post"
import {usePosts} from "@/app/admin/blog/hooks/use.posts";
import {useRouter} from "next/navigation";
import {Title} from "@/app/shared/components/Title";
import {PostForm} from "@/app/admin/blog/components/PostForm";
import {Button} from "@/app/shared/components/Button";
import {Section} from "@/app/shared/components/Section";

interface Props {
    post: Post
}

export const EditPost: React.FC<Props> = ({post}) => {
    const {posts, isLoading, update} = usePosts()
    const [postToEdit, setPostToEdit] = useState<Post | undefined>(post)
    const {push} = useRouter()
    const isSaveBlocked = postToEdit === undefined || JSON.stringify(post) === JSON.stringify(postToEdit)
    const handleSave = async () => {
        if (postToEdit) {
            await update(post.slug, postToEdit)
            handleBack()
        }
    }

    const handleBack = () => {
        push("/admin/blog")
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

