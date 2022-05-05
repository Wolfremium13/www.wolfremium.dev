import { Box, Heading, Link, Image } from "@chakra-ui/react";
import PostTags from "./PostTags";
import PostDate from "./PostDate";
import PostReadingTime from "./PostReadingTime";
import { formatDate } from "../../lib/format-date";

const defaultImage = "/assets/default-image.png";

const hasPreviewImage = (post) => post.preview ?? defaultImage;

const Post = ({ post }) => {
  const postUrlLink = `blog/${post.slug}`
  return (
    <Box w="100%">
      <Box
        borderRadius="3xl"
        overflow="hidden"
        border="2px"
        borderColor="teal.200"
      >
        <Link
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          href={postUrlLink}
        >
          <Image
            transform="scale(1.0)"
            src={hasPreviewImage(post)}
            alt={post.preview}
            objectFit="cover"
            width="100%"
            transition="0.5s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
            height="280"
          />
        </Link>
      </Box>

      <PostTags tags={post.tags} marginTop="3" />
      <Heading fontSize="xl" marginTop="2">
        <Link
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          href={post.slug}
        >
          {post.title}
        </Link>
      </Heading>
      <PostDate date={formatDate(post.date)} />
      <PostReadingTime readingTime={post.readingTime}></PostReadingTime>
    </Box>
  );
};

export default Post;
