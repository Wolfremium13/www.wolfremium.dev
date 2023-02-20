import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <Box>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Box paddingTop={"20"} zIndex={"-1"}>{children}</Box>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </Box>
  </>
);

export default Layout;
