import { getFilesBySlug, getFiles } from "../lib/mdx";

export default function Post({ source, frontmatter }) {
  console.log(source);
  return <h1>Test</h1>;
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
