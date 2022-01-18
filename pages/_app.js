import "../styles/prism-darcula.css";
import Head from "next/head";
import Router from "next/router";
import { NProgress } from "nprogress";
import { ChakraProvider,ColorModeScript } from "@chakra-ui/react";
import theme from '../styles/theme.js'

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <ChakraProvider theme={theme}>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
