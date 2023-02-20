import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavItem from "./NavItem";
import pageLinks from "../../data/page-links";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        justifyContent={{ base: "none",md: "center" }}
        display={{ base: "column", md: "flex" }}
      >
        <Flex
          height={"20"}
          justifyContent={{ base: "space-between", md: "left" }}
          fontSize={"xl"}
          minW={{ md: "100%", xl: "7xl" }}
          alignItems={"center"}
        >
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
      </Flex>
    </>
  );
};

export default Navbar;
