import { getAllFiles } from "../lib/mdx";
import { Container, VStack, Heading, Text, Link } from "@chakra-ui/react";
import PostList from "../components/blog/PostList";
import Welcome from "../components/home/Welcome";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import HeadTags from "../components/page/HeadTags";

export default function Home({ posts }) {
  return (
    <>
      <HeadTags />
      <Container maxW={"7xl"} p="12">
        <Welcome></Welcome>
        <PostList posts={posts}></PostList>
        <VStack paddingTop="50px" spacing="6" alignItems="flex-start">
          <Heading as="h2">¿De qué suelo escribir?</Heading>
          <Text as="p" fontSize="lg">
            Me gusta ir comentando cosas relevantes o de importancia a medida
            qué las voy aprendiendo (un poco de todo 😂). Normalmente es algo
            bastante asíncrono con respecto a la publicación así qué no se
            esperen un post de algo qué salió ayer. Tampoco soy en genio de la
            redacción, lo iré escribiendo con la finalidad de qué los artículos
            sean apuntes.
          </Text>

          <Heading as="h2">¿Te gusta la página?</Heading>
          <Text as="p" fontSize="lg">
            Aquí te dejo un enlace al{" "}
            {
              <Link
                href={"https://github.com/Wolfremium13/blog-react"}
                color="teal.200"
                isExternal
              >
                repositorio <ExternalLinkIcon w={3} h={3} color="teal.200" />
              </Link>
            }{" "}
            por si lo quieres clonar, no tiene nada del otro mundo (de momento
            😎).
          </Text>
        </VStack>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllFiles();
  const maxPosts = 3;
  const posts = allPosts.slice(0, maxPosts);
  return {
    props: {
      posts,
    },
  };
}
