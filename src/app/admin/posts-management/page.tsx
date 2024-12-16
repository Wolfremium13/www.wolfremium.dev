"use client";
import React, {useState} from "react";
import {Post} from "@/core/blog/posts/models/post";
import {
    PostsManagementControllerClientAllPosts,
    PostsManagementControllerClientDelete
} from "@/core/blog/posts/controller/posts-management-controller-client-all-posts";
import Link from "next/link";
import Card from "@/core/shared/ui/components/Card";
import {GiScrollUnfurled} from "react-icons/gi";

const PostsManagementPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        await PostsManagementControllerClientAllPosts(setLoading, setError, setPosts);
    }

    const handleDeletion = (slug: string) => async () => {
        await PostsManagementControllerClientDelete(slug, setLoading, setError, setPosts);
    }

    return (
        <Card>
            <section>
                <h1 className="d-flex text-2xl font-bold mb-4 text-lightGreen text-center">
                  <span className="flex items-center">
                      <GiScrollUnfurled className="text-6xl hidden sm:inline"/> Administrador de posts
                  </span>
                </h1>

                <button onClick={fetchPosts}
                        className="bg-darkViolet text-lightGreen px-4 py-2 rounded-lg hover:bg-mediumViolet hover:text-white border border-lightGreen">
                    Cargar posts
                </button>


                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {posts.length === 0 && (
                    <p className="text-center">
                        No se encontraron posts
                    </p>
                )}

                {posts.map((post) => (
                    <div key={post.getSlug()}
                         className={"border-2 border-darkGreen hover:border-lightGreen rounded-lg overflow-hidden hover:scale-105 transform transition-transform"}>
                        <div className={"p-4 absolute bottom-0 bg-gray-900/60 w-full"}>
                            <h2 className={"text-xl font-semibold"}>{post.getTitle()}</h2>
                            <p className={"text-gray-400 text-sm mt-2"}>📅 {post.getDatePublished()}</p>

                            <Link href={`/admin/posts/${post.getSlug()}`}>
                                Editar
                            </Link>

                            <button onClick={handleDeletion(post.getSlug())}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </Card>
    );
}
export default PostsManagementPage;