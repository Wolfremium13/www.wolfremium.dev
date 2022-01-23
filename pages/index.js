import { getAllFilesMetadata } from "../lib/mdx";
import { orderByDate } from "../lib/order-by-date";
import { Container, VStack, Heading, Text } from "@chakra-ui/react";
import PostList from "../components/blog/PostList";
import Welcome from "../components/home/Welcome";

export default function Home({ posts }) {
  return (
    <Container maxW={"7xl"} p="12">
      <Welcome></Welcome>
      <PostList posts={posts}></PostList>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">¿De qué suelo escribir?</Heading>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts = getAllFilesMetadata();
  const maxPosts = 3;
  const posts = allPosts.sort(orderByDate).slice(0, maxPosts);
  // console.log(posts);
  return {
    props: {
      posts,
    },
  };
}
