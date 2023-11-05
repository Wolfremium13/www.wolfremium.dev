import { Layout } from "@/components/page/Layout";
import { Card } from "@/components/page/Card";
import { PostPreview } from "@/components/navigation/PostPreview";
import { PaginationNav } from "@/components/navigation/PaginationNav";
import Head from "next/head";
import { PostsFactoryRepository } from "@/lib/posts/infrastructure/posts.factory.repository";

type Post = {
  title: string;
  slug: string;
  date: string;
  preview: string;
  tags: string[];
};

type BlogProps = {
  posts: Post[];
  page: number;
  totalPages: number;
};

export default function Blog({ posts, page, totalPages }: BlogProps) {
  return (
    <Layout>
      <Head>
        <title>{`Blog - ${page ? page.toString() : "Desconocida"}`}</title>
        <meta
          name="description"
          content="Lista de artículos publicados en nuestro blog."
        />
        <meta name="robots" content="follow, index" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog?page=${page}`}
        />
      </Head>
      <Card>
        <div className="container mx-auto px-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                slug={post.slug}
                preview={post.preview}
                postDate={post.date}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-2xl font-bold h-52 pt-12">
              😱 No hay publicaciones disponibles para esta página. Intenta con
              otra.
            </div>
          )}
        </div>

        {<PaginationNav page={page} totalPages={totalPages} />}
      </Card>
    </Layout>
  );
}

type StaticPropsContext = {
  params: {
    number: string;
  };
};

export const getStaticProps = async (context: StaticPropsContext) => {
  const postsRepository = PostsFactoryRepository.getInstance(
    process.env.STORAGE ?? "local"
  );
  const totalPages = await postsRepository.getTotalPages();
  const rawPageNumber = context.params?.number;
  const currentPage = parseInt(rawPageNumber, 10);
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    return {
      notFound: true,
    };
  }
  const paginatedPosts = await postsRepository.getPaginatedPosts(currentPage);
  return {
    props: {
      posts: paginatedPosts,
      page: currentPage,
      totalPages,
    },
  };
};

export const getStaticPaths = async () => {
  const postsRepository = PostsFactoryRepository.getInstance(
    process.env.STORAGE ?? "local"
  );
  const totalPages = await postsRepository.getTotalPages();
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { number: (i + 1).toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};
