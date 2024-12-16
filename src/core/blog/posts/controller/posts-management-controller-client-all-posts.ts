import {Post} from "@/core/blog/posts/models/post";

export const PostsManagementControllerClientAllPosts =
    async (
        setLoading: (loading: boolean) => void,
        setError: (error: (string | null)) => void,
        setPosts: (value: (((prevState: Post[]) => Post[]) | Post[])) => void)
        : Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const postsResponse = await fetch("/api/posts/management", {
                method: "GET",
            });
            const posts = await postsResponse.json();
            if (!postsResponse.ok) {
                setError(posts.error);
                return;
            }
            setPosts(posts);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            setError("Error al obtener los posts");
        } finally {
            setLoading(false);
        }
    };