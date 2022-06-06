import { Box, Heading, Link, Image } from "@chakra-ui/react";
import PostTags from "./PostTags";
import PostDate from "./PostDate";
import PostReadingTime from "./PostReadingTime";
import { formatDate } from "../../lib/format-date";
import InfiniteScroll from "react-infinite-scroll-component";

const defaultImage = "/assets/default-image.png";

const hasPreviewImage = (metadata) => metadata.preview ?? defaultImage;

const Post = ({ post }) => {
  const metadata = post.frontMatter
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
          href={post.url}
        >
          <Image
            transform="scale(1.0)"
            src={hasPreviewImage(metadata)}
            alt={metadata.preview}
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

      <PostTags tags={metadata.tags} marginTop="3" />
      <Heading fontSize="xl" marginTop="2">
        <Link
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          href={metadata.slug}
        >
          {metadata.title}
        </Link>
      </Heading>
      <PostDate date={formatDate(metadata.date)} />
      <PostReadingTime readingTime={metadata.readingTime}></PostReadingTime>
    </Box>
  );
};

export default Post;
