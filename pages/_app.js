import "../styles/globals.css";
import "../styles/prism-darcula.css";
import theme, { ThemeProvider } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
