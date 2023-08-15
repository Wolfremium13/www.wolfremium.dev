import { Layout } from "@/components/page/Layout";
import { MDXRemote } from "next-mdx-remote";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Card } from "@/components/page/Card";
import "@/public/styles/github-markdown-dark.css";
import Head from "next/head";
import { PostsFactoryRepository } from "@/lib/posts/infrastructure/posts.factory.repository";

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
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={generateDescriptionFromContent(post.content)}
        />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={generateDescriptionFromContent(post.content)}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.preview} />
        <meta property="article:published_time" content={post.date} />
      </Head>
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

const generateDescriptionFromContent = (content: string) => {
  const removeLinksRegex = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
  const removeLineBreaks = /\n/g;
  const removeH2Tittles = /##.*\n/g;
  const maxDescriptionLength = 150;
  return (
    content
      .replaceAll(removeLinksRegex, "$1")
      .replaceAll(removeLineBreaks, " ")
      .replaceAll(removeH2Tittles, " ")
      .split("")
      .slice(0, maxDescriptionLength)
      .join("") + "..."
  );
};

export const getStaticProps = async (context: StaticPropsContext) => {
  const postsRepository = PostsFactoryRepository.getInstance(
    process.env.STORAGE ?? "local"
  );
  const slug = context.params.slug;
  const post = await postsRepository.getPost(slug);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const postsRepository = PostsFactoryRepository.getInstance(
    process.env.STORAGE ?? "local"
  );
  const posts = await postsRepository.getPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}