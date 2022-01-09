import { getFilesBySlug, getFiles } from "../lib/mdx";
import { MDXRemote } from "next-mdx-remote";

export default function Post({ source, frontmatter }) {
  return <MDXRemote {...source} />;
}

export async function getStaticProps({ params }) {
  const { source, frontmatter } = await getFilesBySlug(params.slug);
  return {
    props: { source, frontmatter },
  };
}

export async function getStaticPaths() {
  const posts = await getFiles();
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
