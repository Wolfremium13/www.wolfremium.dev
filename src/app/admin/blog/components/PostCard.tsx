"use client"
import Image from "next/image"
import React from "react"
import {Post} from "@/app/admin/blog/types/post"
import {Card} from "@/app/shared/components/Card"
import {Title} from "@/app/shared/components/Title";
import {UrlFormatted} from "@/app/shared/components/UrlFormatted";
import {DateFormatted} from "@/app/shared/components/DateFormatted";
import {Button} from "@/app/shared/components/Button";
import {ConfirmDialog} from "@/app/shared/components/ConfirmDialog";
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
                        width={400}
                        height={400}
                        priority={true}
                        className="w-full h-80 object-cover border-2 border-mediumViolet rounded-2xl"
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
