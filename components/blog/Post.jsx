import {
  Box,
  Heading,
  Link,
  Image,
} from "@chakra-ui/react";
import PostTags from "./PostTags";
import PostDate from "./PostDate";
import { formatDate } from "../../lib/format-date";

const Post = ({ post }) => {
  return (
    <Box w="100%">
      <Box borderRadius="lg" overflow="hidden">
        <Link
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          href={post.slug}
        >
          <Image
            transform="scale(1.0)"
            src={
              "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            }
            alt="some text"
            objectFit="contain"
            width="100%"
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Link>
      </Box>

      <PostTags tags={post.tags} marginTop="3" />
      <Heading fontSize="xl" marginTop="2">
        <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
          {post.title}
        </Link>
      </Heading>
      <PostDate date={formatDate(post.date)} />
    </Box>
  );
};

export default Post;
