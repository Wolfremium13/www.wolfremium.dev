import Link from "next/link";
import { Flex, Box, Spacer, Text } from "@chakra-ui/react";
import sections from "../data/sections";

const Navbar = () => (
  <Flex p="2" borderBottom="1px" borderColor="gray.100">
    <Box fontSize="24px" fontWeight="bold">
      <Link href="/" paddingLeft="2">
        Wolfremium
      </Link>
    </Box>
    <Spacer />
    <Box>
      {sections.map(({ name, path }) => {
        return (
          <a href={path}>{name}</a>
        );
      })}
    </Box>
  </Flex>
);

export default Navbar;
