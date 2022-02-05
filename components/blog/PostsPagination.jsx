import { useRef, useEffect, useState, useCallback } from "react";
import { Text, Container, Input } from "@chakra-ui/react";
import { usePagination } from "../../lib/use-pagination";
import PostList from "./PostList";

const PostsPagination = ({ posts }) => {
  console.log(posts);
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

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <Container maxW={"7xl"} p="12">
      {currentPosts && <PostList posts={currentPosts}></PostList>}
      {currentPage !== maxPage && (
        <Text fontSize="xl" fontWeight="bold" p={6} ref={setElement}>
          🐢 Cargando...
        </Text>
      )}
    </Container>
  );
};

export default PostsPagination;
