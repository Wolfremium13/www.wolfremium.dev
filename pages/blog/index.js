import { useCallback, useRef, useState, useEffect } from "react";
import PostList from "../../components/blog/PostList";
import { getAllFiles } from "../../lib/mdx";
import { usePagination } from "../../lib/use-pagination";

import {
  Text,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

export default function Blog({ posts }) {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(posts);

  // Filter
  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      query = query.toLowerCase();
      const res = query
        ? results.filter((post) => {
            const metadata = post.frontMatter;
            return (
              metadata.title.toLowerCase().includes(query) ||
              metadata.tags.some((tag) => tag.toLowerCase().includes(query))
            );
          })
        : [];
      setResults(res);
    }
  }, []);

  //Infinite scroll
  const maxPostsInPage = 6;
  const { next, currentPage, currentData, maxPage } = usePagination(
    results,
    maxPostsInPage
  );
  const [element, setElement] = useState(null);
  const observer = useRef();
  const prevY = useRef(0);

  const currentPosts = currentData();

  useEffect(() => {

    observer.current = new IntersectionObserver(
      (entries) => {
        console.log(entries)
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
    <>
      <Container ref={searchRef} mt="10" maxW={"2xl"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdSearch color="gray.200" />
          </InputLeftElement>
          <Input
            onChange={onChange}
            placeholder="¿Estás buscando algo?"
            type="text"
            value={query}
            borderColor="teal.600"
            border={"2px"}
          />
        </InputGroup>
      </Container>
      
      {currentPosts.length > 0 && (
        <Container maxW={"7xl"} p="12">
          {currentPosts && <PostList posts={currentPosts}></PostList>}
          {currentPage !== maxPage && currentPosts.length >= maxPostsInPage && (
            <Text fontSize="xl" fontWeight="bold" p={6} ref={setElement}>
              🐢 Cargando...
            </Text>
          )}
        </Container>
      )}
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFiles();
  return {
    props: {
      posts,
    },
  };
}
