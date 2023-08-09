import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Layout } from "@/components/page/Layout";
import { Card } from "@/components/page/Card";
import { PostPreview } from "@/components/navigation/PostPreview";
import { PaginationNav } from "@/components/navigation/PaginationNav";
import Head from "next/head";

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
        <title>{`Blog - ${page ? page.toString() : 'Desconocida'}`}</title>
        <meta name="description" content="Lista de artículos publicados en nuestro blog." />
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog?page=${page}`} />
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

export const getServerSideProps = async (context: StaticPropsContext) => {
  const postsDirectory = path.join(process.cwd(), "data", "posts");
  const filenames = fs
    .readdirSync(postsDirectory)
    .filter((fn) => fn.endsWith(".mdx"));

  const allPosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      slug: filename.replace(".mdx", ""),
      date: data.date,
      preview: data.preview,
      tags: data.tags,
    };
  });

  const sortedPosts = allPosts.sort((a: Post, b: Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const POSTS_PER_PAGE = 9;
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const currentPage = context.params?.number
    ? parseInt(context.params.number, 10)
    : 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return {
    props: {
      posts: paginatedPosts,
      page: currentPage,
      totalPages,
    },
  };
};
