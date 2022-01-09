import { formatDate } from "../lib/format-date";
import { Flex, Text, Tag, Link } from "./elements";
import { IconCalendar, IconComment, IconClock } from "./icons";

export const PostMetadata = ({ metadata }) => {
  return (
    <Flex direction="column" px={[0, 2, 4]} py={2}>
      <Flex
        direction={["column", "column", "row"]}
        align={["left", "left", "center"]}
        justify="flex-start"
        color="grayblue.100"
        fontSize={["xs", "sm"]}
      >
        <Flex align="center">
          <IconCalendar />
          <Text mx={2}>{formatDate(metadata.date)}</Text>
        </Flex>
        <Flex align="center">
          <IconClock />
          <Text mx={2}>
            {Math.round(metadata.readingTime.minutes)} minutos de lectura
          </Text>
        </Flex>
        <Flex direction="row">
          {metadata.tags.map((tag) => (
            <Tag key={tag} size="sm" mx={2} colorScheme="brand">
              {tag}
            </Tag>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};