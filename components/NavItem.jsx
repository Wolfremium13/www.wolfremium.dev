import { Link, useColorModeValue } from "@chakra-ui/react";

const NavItem = ({ name, path }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={path}
  >
    {name}
  </Link>
);

export default NavItem;
