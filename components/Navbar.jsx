import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavItem from "./NavItem";
import sections from "../data/sections";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileIcon = "https://media-exp1.licdn.com/dms/image/C5603AQHqs-MJVtbQmw/profile-displayphoto-shrink_200_200/0/1641548979394?e=1648080000&v=beta&t=ohEMcFRBWliKVdutRSW3oMeiLWdZrvZ7SCWGe_TpZAg";

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
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
              {sections.map(({ name, path }) => (
                <NavItem name={name} path={path}>
                  {name}
                </NavItem>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"md"} src={profileIcon} />
              </MenuButton>
              <MenuList>
                {sections.map(({ name, path }) => {
                  return (
                    <MenuItem as={Link} href={path}>
                      {name}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {sections.map(({ name, path }) => (
                <NavItem name={name} path={path}>
                  {name}
                </NavItem>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
