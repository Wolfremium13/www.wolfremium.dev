import "@/public/styles/globals.css";
import "@/public/styles/scroll-bar.css";
import "@/public/styles/github-corner.css";
import type { Metadata } from "next";
import { Layout } from "@/components/page/Layout";

export const metadata: Metadata = {
  title: "Kevin Hierro - Wolfremium",
  description:
    "Soy un artesano del software con experiencia en la creación de aplicaciones web e ingeniería de datos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-darkViolet">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
