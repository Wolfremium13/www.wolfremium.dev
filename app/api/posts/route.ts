import { Post } from "@/lib/posts/domain/post";
import { PostsFactoryRepository } from "@/lib/posts/infrastructure/posts.factory.repository";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchTitle = searchParams.get("search");
  if (searchTitle) {
    const posts = await searchPostsByTitle(searchTitle);
    return new Response(JSON.stringify(posts));
  }
  return new Response(JSON.stringify([]));
}

async function searchPostsByTitle(title: string): Promise<Post[]> {
  const postsRepository = PostsFactoryRepository.getInstance(
    process.env.STORAGE ?? "local"
  );
  const posts = (await postsRepository.getPosts()) ?? [];
  return posts.filter((post) =>
    post.title.toLowerCase().includes(title.toLowerCase())
  );
}
