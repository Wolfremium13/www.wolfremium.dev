import { MdAccessTime } from "react-icons/md";
import { HStack, Text } from "@chakra-ui/react";

const PostReadingTime = ({ readingTime }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <MdAccessTime />
      <Text mx={2}>{Math.round(readingTime.minutes)} minutos de lectura</Text>
    </HStack>
  );
};

export default PostReadingTime;