import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Layout } from "@/components/page/Layout";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Card } from "@/components/page/Card";
import "@/public/styles/github-markdown-dark.css";

type PostData = {
  title: string;
  date: string;
  preview: string;
  tags: string[];
  content: string;
  mdxSource: any;
};

type PostProps = {
  post: PostData;
};

export default function PostPage({ post }: PostProps) {
  return (
    <Layout>
      <Card>
        <section className="markdown-body flex justify-center content-center pt-8 w-full">
          <div className="w-full px-4 md:px-0 md:max-w-5xl">
            <h1>{post.title}</h1>
            <MDXRemote {...post.mdxSource} components={MDXComponents} />
          </div>
        </section>
      </Card>
    </Layout>
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

  const mdxSource = await serialize(content);

  const post = {
    title: data.title,
    date: data.date,
    preview: data.preview,
    tags: data.tags,
    content,
    mdxSource,
  };

  return {
    props: {
      post,
    },
  };
};
