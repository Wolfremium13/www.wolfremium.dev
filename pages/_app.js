import "../styles/prism-darcula.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import { PageTags } from "../components/PageTags";

import Layout from "../components/page/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PageTags />
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
