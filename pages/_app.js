import "../styles/github-markdown.css";
import "../styles/blog.css";
import "../styles/scroll.css";
import "../styles/prism-material-oceanic.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import Layout from "../components/page/Layout";
import HeadTags from "../components/page/HeadTags";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadTags />
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
