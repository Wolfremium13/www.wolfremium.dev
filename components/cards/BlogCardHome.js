import NextLink from "next/link";

import { Card } from "./_Card";
import { Text, Link, Box } from "../elements";

export const BlogCardHome = ({ posts }) => {
  return (
    <Card type="home" headerTitle="Blog" color="gray">
      {posts.map((post) => (
        <NextLink href={post.slug} key={post.slug}>
          <a>
            <Box my={2}>
              <Text color="gray.900" isTruncated>{post.title}</Text>
              <Text fontSize="xs" color="gray">
                {post.date}
              </Text>
            </Box>
          </a>
        </NextLink>
      ))}
      <NextLink href="/blog">
        <Link color="gray.900">Ir al Blog →</Link>
      </NextLink>
    </Card>
  );
};