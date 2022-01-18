import { Box } from "@chakra-ui/react";
import { PageTags } from "./PageTags";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <PageTags />
    <Box>
      <header>
        <Navbar></Navbar>
      </header>
      <main>{children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </Box>
  </>
);

export default Layout;
