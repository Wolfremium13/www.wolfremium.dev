import { HStack, Tag, Text, Flex } from "@chakra-ui/react";

const PostTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      <Flex wrap={"wrap"}>
        {props?.tags.map((tag) => {
          return (
            <Tag m="1" size={"lg"} variant="solid" colorScheme="teal" key={tag}>
              <Text isTruncated key={tag}>
                {tag}
              </Text>
            </Tag>
          );
        })}
      </Flex>
    </HStack>
  );
};

export default PostTags;
