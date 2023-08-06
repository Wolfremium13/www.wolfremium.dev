import "@/public/styles/globals.css";
import "@/public/styles/scroll-bar.css";
import "@/public/styles/github-corner.css";

import { Footer } from "../navigation/Footer";
import { Navbar } from "../navigation/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-darkViolet">
      <Navbar />
      <main className="min-h-screen pt-20 md:p-20 bg-darkViolet text-cyan-50 bg-confetti bg-fixed">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
