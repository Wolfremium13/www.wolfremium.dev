import { getFilesBySlug, getFiles } from "../../lib/mdx";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "../../components/mdx/MDXComponents";
import { Heading } from "@chakra-ui/react";
import { formatDate } from "../../lib/format-date";

export default function Post({ source, frontmatter }) {
  return (
    <>
      <Heading mt="4" align="center">📅 {formatDate(frontmatter.date)}</Heading>
      <section className="post-body">
        <article className="markdown-body">
          <MDXRemote
            {...source}
            components={MDXComponents}
            metadata={frontmatter}
          />
        </article>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { source, frontmatter } = await getFilesBySlug(params.slug);
  return {
    props: {
      source,
      frontmatter: {
        slug: params.slug,
        ...frontmatter,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getFiles();
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
