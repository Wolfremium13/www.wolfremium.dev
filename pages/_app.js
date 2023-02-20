import "../styles/markdown.css";
import "../styles/blog.css";
import "../styles/scroll.css";
import "../styles/prism-material-oceanic.css";
import "../styles/github-corner.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import Layout from "../components/page/Layout";
import GitHubCorner from "../components/page/GitHubCorner";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <GitHubCorner />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
