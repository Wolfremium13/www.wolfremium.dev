import React from "react";
import { Heading, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import Post from "./Post";

const PostList = ({ posts }) => {
  return (
    <>
      <Heading as="h2" marginTop="5">
        Artículos
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {posts.map((post) => (
          <WrapItem
            key={post.slug}
            width={{ base: "100%", sm: "100%", md: "29%", lg: "30%" }}
          >
            <Post key={post.slug} post={post}></Post>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};

export default PostList;
