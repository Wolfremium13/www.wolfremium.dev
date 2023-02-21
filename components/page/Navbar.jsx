import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavItem from "./NavItem";
import pageLinks from "../../data/page-links";
import GitHubCorner from "./GitHubCorner";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        backgroundColor="rgba(23, 25, 35, 0.8)"
        justifyContent={{ base: "none", md: "center" }}
        display={{ base: "column", md: "flex" }}
        as="header"
        position="fixed"
        w="100%"
        pl={"4"}
        backdropFilter="saturate(180%) blur(5px)"
        zIndex={"banner"}
      >
        <Flex
          height={"20"}
          justifyContent={{ base: "space-between", md: "left" }}
          fontSize={"xl"}
          minW={{ md: "100%", xl: "7xl" }}
          alignItems={"center"}
        >
          <Avatar
            size={"lg"}
            src={"/assets/layout/navbar-logo.webp"}
            display={{ base: "none", md: "flex" }}
            marginRight={"4"}
            bg="transparent"
            border={"4px"}
          />
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {pageLinks.map(({ name, path }) => (
                <NavItem key={name} name={name} path={path}>
                  {name}
                </NavItem>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {pageLinks.map(({ name, path }) => (
                <NavItem key={name} name={name} path={path}>
                  {name}
                </NavItem>
              ))}
            </Stack>
          </Box>
        ) : null}
        <GitHubCorner></GitHubCorner>
      </Flex>
    </>
  );
};

export default Navbar;
