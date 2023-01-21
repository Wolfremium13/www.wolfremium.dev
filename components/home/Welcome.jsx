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
      <Heading as="h1">
        Previsión del tiempo para esta noche: estará oscuro 🌚
      </Heading>
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
              src={"/assets/personal-image.webp"}
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
          <Heading marginTop="1">¿Quién soy?</Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            Soy un adicto al trabajo con muchas ganas de aprender
            independientemente del rol ejercido. Me gusta leer y compartir
            libros del sector TIC, me apasiona la artesanía del software pero
            sin perder de vista que hay que dar valor. Mi metodología Agile
            favorita es Design Thinking. Es posible que haya cambiado con
            respecto a la foto 😹, siéntanse como en casa, cualquier cosilla en
            el footer está mi correo.
          </Text>
          <PostTags
            tags={[
              "💗 Software Crafter",
              "🫖 Nestea",
              "😺 Cats",
              "🏘 Data Engineering",
              "🐧 Linux",
              "🕸 Web Development",
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Welcome;
