import { Box } from "@chakra-ui/react";
const YouTube = ({ videoId, title }) => {
  return (
    <iframe
      width="100%"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
    ></iframe>
  );
};

export default YouTube;
