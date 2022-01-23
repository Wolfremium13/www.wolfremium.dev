import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import SocialButton from "./SocialButton";
import  {linkedInUrl, githubUrl, youtubeUrl, twitterUrl} from "../../data/social-links"

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>🐺 {new Date().getFullYear()} - Kevin Hierro Carrasco</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={twitterUrl}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={"YouTube"} href={youtubeUrl}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"Github"} href={githubUrl}>
            <BsGithub />
          </SocialButton>
          <SocialButton label={"LinkedIn"} href={linkedInUrl}>
            <BsLinkedin />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
