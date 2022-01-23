import { Image, Box } from "@chakra-ui/react";
const MdxImage = ({ src, alt }) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" m="4">
      <Image src={src} alt={alt} borderRadius="lg" />
    </Box>
  );
};

export default MdxImage;