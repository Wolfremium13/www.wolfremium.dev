import { useRef, useEffect, useState } from "react";
import { Text, Container } from "@chakra-ui/react";
import { orderByDate } from "../lib/order-by-date";
import { getAllFilesMetadata } from "../lib/mdx";
import { usePagination } from "../lib/use-pagination";
import PostList from "../components/blog/PostList";
import Search from "../components/Search";

export default function Blog({ posts }) {
  const maxPostsInPage = 6;
  const { next, currentPage, currentData, maxPage } = usePagination(
    posts,
    maxPostsInPage
  );
  const [element, setElement] = useState(null);
  const observer = useRef();
  const prevY = useRef(0);

  const currentPosts = currentData();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;

        if (prevY.current > y) {
          next();
        }
        prevY.current = y;
      },
      { threshold: 0.5 }
    );
  }, []);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <Container maxW={"7xl"} p="12">
      {/*     <Search /> */}
      {currentPosts && <PostList posts={currentPosts}></PostList>}
      {currentPage !== maxPage && (
        <Text fontSize="xl" fontWeight="bold" p={6} ref={setElement}>
          🐢 Cargando...
        </Text>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const unorderedPosts = getAllFilesMetadata();
  const posts = unorderedPosts.sort(orderByDate);
  return {
    props: { posts },
  };
}
