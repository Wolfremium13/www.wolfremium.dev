import { Fragment } from "react";
import { getAllFilesMetadata } from "../lib/mdx";
import { orderByDate } from "../lib/order-by-date";
import { Box, Flex, Container } from "@chakra-ui/react";
import { BlogCardHome } from "../components/cards/BlogCardHome";

export default function Home({ posts }) {
  return (
    <Fragment>
      <Box bg="gray.600" position="relative" zIndex="1">
        <Container maxW="container.2xl" px={[0, 4]}>
          <Flex direction={["column"]} justify="space-between">
            <BlogCardHome posts={posts} />
          </Flex>
        </Container>
      </Box>
    </Fragment>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllFilesMetadata();
  const posts = allPosts.sort(orderByDate).slice(0, 2);
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
}
