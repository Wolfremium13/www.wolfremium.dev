import {
  Box,
  Heading,
  Link,
  Image,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import { MdAccessTime } from "react-icons/md";
import PostReadingTime from "./PostReadingTime";
import PostTags from "./PostTags";
import PostDate from "./PostDate";
import { formatDate } from "../../lib/format-date";
import NextLink from "next/link";

const PostCompact = ({ post }) => {
  console.log(post);
  return (
    <>
      <Link href={post.slug} key={post.slug}>
        <Heading fontSize="xl" marginTop="2">
          <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
            {post.title}
          </Text>
        </Heading>
        <Flex justify="space-around" wrap={"wrap"} fontSize="md">
          <PostDate date={formatDate(post.date)} />
          <PostReadingTime readingTime={post.readingTime}></PostReadingTime>
        </Flex>
      </Link>
      <Divider margin="5"/>
    </>
  );
};

export default PostCompact;
