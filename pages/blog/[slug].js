import { getFileBySlug } from "../../lib/mdx";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "../../components/mdx/MDXComponents";
import { Box, Heading, Text } from "@chakra-ui/react";
import { formatDate } from "../../lib/format-date";
import { getMdxPaths } from "next-mdx/server";
import HeadTags from "../../components/page/HeadTags";

export default function Post({ post }) {
  console.log(post);
  const metadata = post.frontMatter;
  return (
    <>
      <HeadTags metadata={metadata} />
      <Heading align="center" mt={"4"}>
        <Text color="gray.300">📅 {formatDate(metadata.date)}</Text>
      </Heading>
      <Box className="post-body">
        <article className="markdown-body">
          <h1 align="center">{metadata.title}</h1>
          <MDXRemote
            {...post.serialize}
            components={MDXComponents}
            metadata={metadata}
          />
        </article>
      </Box>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = (await getMdxPaths("post"))
    .map((p) => `/blog/${p.params.slug}`)
    .flat();
  return {
    paths: paths,
    fallback: false,
  };
}
