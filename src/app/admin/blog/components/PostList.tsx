"use client"
import React, {Fragment, useState} from "react"
import {usePosts} from "@/app/admin/blog/hooks/use.posts"
import {Post} from "@/app/admin/blog/types/post"
import {PostCard} from "./PostCard"
import {useRouter} from "next/navigation"
import {Title} from "@/app/shared/components/Title";
import {ConfirmDialog} from "@/app/shared/components/ConfirmDialog";
import {ErrorDialog} from "@/app/shared/components/ErrorDialog";
import {CardButton} from "@/app/shared/components/CardButton";
import {GiBrain} from "react-icons/gi";

export const PostList: React.FC = () => {
    const {posts, isLoading, update, deletePost} = usePosts()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [postToPublish, setPostToPublish] = useState<Post>()
    const {push} = useRouter()

    const handlePublishPost = async () => {
        if (postToPublish) {
            await update(postToPublish.slug, {...postToPublish, published: true})
            setPostToPublish(undefined)
        }
    }

    const handleCloseErrorDialog = () => {
        setErrorMessage(undefined)
    }

    const handleCreatePost = () => {
        push("/admin/blog/create")
    }

    const handleEditPost = ({slug}: Post) => {
        push(`/admin/blog/edit/${slug}`)
    }

    const handleDeletePost = async (post: Post) => {
        await deletePost(post.slug)
    }

    if (isLoading) return <p className={"text-center"}>Cargando...</p>

    return (
        <>
            <div className="mb-4">
                <Title as="h2" size="md">Posts <small>({posts.length})</small></Title>
                <p className="neutral-light">
                    <GiBrain className="w-4 h-4 mr-1 -mt-1 inline-block text-pink-500"/>
                    <span>
            Los posts son los artículos que aparecerán en la página web.
            Aparecerán todos aquellos que estén marcados como publicados.
          </span>
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CardButton onClick={handleCreatePost}/>
                {posts.map((post) => (
                    <Fragment key={post.slug}>
                        <PostCard
                            post={post}
                            onClick={() => handleEditPost(post)}
                            onPublish={() => setPostToPublish(post)}
                            onDelete={() => handleDeletePost(post)}
                        />
                    </Fragment>
                ))}
            </div>
            {postToPublish && (
                <ConfirmDialog
                    onAccept={handlePublishPost}
                    onCancel={() => setPostToPublish(undefined)}
                >
                    <p>¿Estás seguro de que quieres publicar el post <b>{postToPublish.title}</b>?</p>
                    <small>Este post aparecerá en la web independientemente de la fecha de publicación</small>
                </ConfirmDialog>
            )}
            {errorMessage && (
                <ErrorDialog
                    error={errorMessage}
                    onClose={handleCloseErrorDialog}
                />
            )}
        </>
    )
}
