import fs from "fs";
import path from "path";
import matter from "gray-matter";

type PostData = {
  title: string;
  date: string;
  preview: string;
  tags: string[];
  content: string;
};

type PostProps = {
  post: PostData;
};

export default function PostPage({ post }: PostProps) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      {/* Puedes agregar más detalles aquí, como la fecha, etiquetas, etc. */}
    </div>
  );
}

type StaticPropsContext = {
    params: {
      slug: string;
    };
  };

export const getServerSideProps = async (context: StaticPropsContext) => {
  const slug = context.params.slug;
  const postsDirectory = path.join(process.cwd(), "data", "posts");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  const post = {
    title: data.title,
    date: data.date,
    preview: data.preview,
    tags: data.tags,
    content,
  };

  return {
    props: {
      post,
    },
  };
};
