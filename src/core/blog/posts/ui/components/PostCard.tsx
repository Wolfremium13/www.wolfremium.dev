"use client"
import Image from "next/image"
import React from "react"
import {Post} from "../types/post"
import {Card} from "@/core/shared/ui/components/Card"
import {Title} from "@/core/shared/ui/components/Title";
import {UrlFormatted} from "@/core/shared/ui/components/UrlFormatted";
import {DateFormatted} from "@/core/shared/ui/components/DateFormatted";
import {Button} from "@/core/shared/ui/components/Button";
import {ConfirmDialog} from "@/core/shared/ui/components/ConfirmDialog";
import {GiFireBomb} from "react-icons/gi";

interface PostCardProps {
    post: Post
    onClick: () => void
    onPublish: () => void
    onDelete: () => void
}

export const PostCard: React.FC<PostCardProps> = ({post, onClick, onPublish, onDelete}) => {
    const website = process.env.NEXT_PUBLIC_VERCEL_URL
    const blogSlug = "blog"
    const postUrl = [website, blogSlug, "posts", post.slug].join("/")
    const hasValidImage = post.imageUrl && post.imageUrl.trim() !== "";
    const [showDeletionDialog, setShowDeletionDialog] = React.useState(false)


    return (
        <Card>
            {!post.published && (
                <div className="bg-secondary bg-opacity-70 text-neutral-light p-0.5 -m-2 mb-0 rounded">
                    <p className="text-center">Borrador</p>
                </div>
            )}
            <Title as="h3" size="sm">{post.title}</Title>
            <div className="-m-2">
                <UrlFormatted href={postUrl} target="_blank" format="long" highlight="slug"/>
            </div>
            {hasValidImage && (
                <figure className="w-full min-h-48 relative flex-1">
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt || 'Post image'}
                        width={640}
                        height={480}
                        priority={true}
                    />
                </figure>
            )}
            <div className="flex flex-row justify-between gap-2 text-neutral-light">
                <DateFormatted value={post.datePublished} format="full-date"/>
            </div>
            <footer className="flex justify-end -m-4 mt-0 p-2 bg-neutral bg-opacity-5 gap-2">
                {!post.published && (
                    <Button color="primary" onClick={onPublish}>Publicar</Button>
                )}
                <Button color="primary" onClick={onClick}>Editar</Button>
                <Button color={"secondary"} onClick={() => setShowDeletionDialog(true)}>Eliminar</Button>
                {showDeletionDialog && (
                    <ConfirmDialog onAccept={onDelete} onCancel={() => setShowDeletionDialog(false)}>
                        <span className={"flex justify-items-center items-center flex-row gap-2 text-neutral-light"}>
                            <GiFireBomb className={"w-16 h-16 text-secondary"}/>
                            <p>¿Estás seguro de que quieres eliminar el post?</p>
                        </span>
                    </ConfirmDialog>
                )}
            </footer>
        </Card>
    )
}
