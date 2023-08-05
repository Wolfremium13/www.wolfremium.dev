import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
    <div>
      {posts.map((post) => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <Link href={`/blog/posts/${post.slug}`}>
            <p>Leer más</p>
          </Link>
        </div>
      ))}

      <div>
        {/* Botón "Anterior" */}
        {page > 1 && (
          <Link href={`/blog/page/${page - 1}`}>
            <p>Anterior</p>
          </Link>
        )}

        {/* Mostrar el número de página actual */}
        <span>
          Página {page} de {totalPages}
        </span>

        {/* Botón "Siguiente" */}
        {page < totalPages && (
          <Link href={`/blog/page/${page + 1}`}>
            <p>Siguiente</p>
          </Link>
        )}
      </div>
    </div>
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
    .filter((fn) => fn.endsWith(".mdx"))
    .sort();

  const POSTS_PER_PAGE = 5;
  const totalPages = Math.ceil(filenames.length / POSTS_PER_PAGE);
  const currentPage = context.params?.number
    ? parseInt(context.params.number, 10)
    : 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentFilenames = filenames.slice(startIndex, endIndex);

  const posts = currentFilenames.map((filename) => {
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
  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return {
    props: {
      posts: sortedPosts,
      page: currentPage,
      totalPages,
    },
  };
};
