import "../../public/styles/globals.css";
import "../../public/styles/scroll-bar.css";
import "../../public/styles/github-corner.css";
import "../../public/styles/github-markdown-dark.css";
import type {Metadata} from "next";
import React from "react";
import Footer from "@/core/shared/infrastructure/ui/layout/Footer";
import Header from "@/core/shared/infrastructure/ui/layout/Header";
import Main from "@/core/shared/infrastructure/ui/layout/Main";

export const metadata: Metadata = {
    title: "Kevin Hierro - Wolfremium",
    description:
        "Soy un artesano del software con experiencia en la creación de aplicaciones web e ingeniería de datos.",
};

export default function RootLayout({children}: { children: React.ReactNode; }) {
    return (
        <html lang="es">
        <body className="bg-darkViolet">
        <Header/>
        <Main>{children}</Main>
        <Footer/>
        </body>
        </html>
    );
}
