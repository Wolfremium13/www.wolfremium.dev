import { HStack, Tag } from "@chakra-ui/react";

const PostTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"lg"} variant="solid" colorScheme="teal" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default PostTags;
