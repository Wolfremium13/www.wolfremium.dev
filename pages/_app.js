import "../styles/markdown.css";
import "../styles/blog.css";
import "../styles/scroll.css";
import "../styles/prism-material-oceanic.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import Layout from "../components/page/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
