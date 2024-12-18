"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {usePosts} from "@/core/blog/posts/ui/hooks/use.posts";
import {Title} from "@/core/shared/ui/components/Title";
import {PostForm} from "@/core/blog/posts/ui/components/PostForm";
import {Post} from "@/core/blog/posts/ui/types/post";
import {Button} from "@/core/shared/ui/components/Button";

export const CreatePost: React.FC = () => {
  const { posts, create, isLoading } = usePosts()
  const [postToCreate, setPostToCreate] = useState<Post | undefined>()
  const { push } = useRouter()

  const isSaveBlocked = postToCreate === undefined

  const handleSave = async () => {
    if (postToCreate) {
      await create(postToCreate)
      push(`/admin/posts-management/edit/${postToCreate.slug}`)
    }
  }

  const handleBack = () => {
    push("/posts-management")
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="relative">
      <div className="mb-4">
        <Title as="h2" size="md">Creación de un nuevo post</Title>
      </div>
      <PostForm
        post={postToCreate}
        posts={posts ?? []}
        onChange={(editedPost) => setPostToCreate(editedPost)}
      />
      <footer className="flex justify-between items-center sticky bottom-2 p-2 gap-2 my-4 mx-auto w-full lg:w-1/2
                         bg-secondary-dark shadow rounded z-20"
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
  )
}
