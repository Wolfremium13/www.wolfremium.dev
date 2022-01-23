import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import PostTags from "./PostTags";
import PostDate from "./PostDate";
import Post from "./Post";

const PostList = ({ posts }) => {
  // console.log(posts);
  return (
    <>
      
      <Heading as="h2" marginTop="5">
        Últimos articulos
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {posts.map((post) => (
          <WrapItem
            key={post.slug}
            width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}
          >
            <Post key={post.slug} post={post}></Post>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default PostList;
