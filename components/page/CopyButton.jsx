import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  useClipboard,
  Tooltip,
  IconButton,
  chakra,
  VisuallyHidden,
} from "@chakra-ui/react";

const CopyButton = ({ children, label, href }) => {
  const { hasCopied, onCopy } = useClipboard(href);
  return (
    <>
      <Tooltip
        label={hasCopied ? "Email Copiado!" : "Copiar Email"}
        closeOnClick={false}
        hasArrow
      >
        <chakra.button
          bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
          rounded={"full"}
          w={8}
          h={8}
          cursor={"pointer"}
          as={"a"}
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          transition={"background 0.3s ease"}
          _hover={{
            bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
          }}
          onClick={onCopy}
        >
          <VisuallyHidden>{label}</VisuallyHidden>
          {children}
        </chakra.button>
      </Tooltip>
    </>
  );
};

export default CopyButton;
