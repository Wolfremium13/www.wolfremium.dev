import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PostTags from "../blog/PostTags";

const Welcome = () => {
  return (
    <>
      <Heading as="h1">👋 Previsión del tiempo para esta noche: estará oscuro</Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Image
              borderRadius="lg"
              src={"/assets/personal-image.jpg"}
              alt="Home image"
              objectFit="contain"
            />
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(teal.600 1px, transparent 1px)",
                "radial(teal.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "5", sm: "2" }}
        >
          <PostTags tags={["❤ Software Crafter"]} />
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              ¿Quién soy?
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            Soy un desarrollador nuevo en el sector, aunque ya algunas cosas he
            visto, back end y data enginnering con sus respectivos stacks
            tecnológicos. Me gusta mucho el trabajo en este sector, el
            teletrabajo y la comunicación en ingles con otras personas del mundo
            es muy interesante. Me gustaría decir qué suelo girar alrededor del
            marco Agile, aprendiendo cómo se aplica. Empecé el camino sel
            software crafter sin tener mucha idea pero aspirando a hacer las
            cosas lo mejor qué se puede y mejorando.
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Welcome;
