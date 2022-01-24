import { Box, Heading, Link, Image } from "@chakra-ui/react";
import PostTags from "./PostTags";
import PostDate from "./PostDate";
import PostReadingTime from "./PostReadingTime";
import { formatDate } from "../../lib/format-date";

const defaultImage = "/assets/default-image.jpg";

const hasPreviewImage = (post) => post.preview ?? defaultImage;

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
            src={hasPreviewImage(post)}
            alt={post.preview}
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
      <PostReadingTime readingTime={post.readingTime}></PostReadingTime>
    </Box>
  );
};

export default Post;
