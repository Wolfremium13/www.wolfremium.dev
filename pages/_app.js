import "../styles/prism-darcula.css";
import Head from "next/head";
import Router from "next/router";
import { NProgress } from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme.js";
import { PageTags } from "../components/PageTags";

import Layout from "../components/Layout";

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
