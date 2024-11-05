import React from "react";
import Link from "next/link";
import { Layout } from "@/components/page/Layout";
import { Card } from "@/components/page/Card";
import { TbError404 } from "react-icons/tb";

const Custom404: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center ">
        <Card>
          <div className=" p-8 rounded-lg text-center">
            <TbError404 className="text-6xl mb-4" />
            <h1 className="text-2xl font-bold mb-4">
              Página no encontrada o ya no existe 🙂
            </h1>
            <p className="mb-4">
              Siento los inconvenientes que esto te pueda causar.
            </p>
            <Link href="/">
              <p className="text-lightGreen hover:underline">
                Volver a la página principal
              </p>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Custom404;
