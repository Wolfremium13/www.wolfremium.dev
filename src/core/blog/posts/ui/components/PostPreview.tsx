import React from "react";
import Image from "next/image";
import Link from "next/link";
import {PostPreview} from "@/core/blog/posts/models/post-preview";


const PostPreviewCard: React.FC<PostPreview> = (post) => {
    return (
        <div
            className={`border-2 border-darkGreen hover:border-lightGreen rounded-lg overflow-hidden hover:scale-105 transform transition-transform`}
        >
            <Link href={`/blog/posts/${post.getSlug()}`}>
                <Image
                    width={500}
                    height={500}
                    src={post.getImageUrl()}
                    alt={post.getTitle()}
                    className="w-full h-80 object-cover"
                    priority={true}
                />
                <div className="p-4 absolute bottom-0 bg-gray-900/60 w-full">
                    <h2 className="text-xl font-semibold">{post.getTitle()}</h2>
                    <p className="text-gray-400 text-sm mt-2">📅 {post.getDate()}</p>
                </div>
            </Link>
        </div>
    );
};

export default PostPreviewCard;
