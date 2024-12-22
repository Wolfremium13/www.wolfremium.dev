import React from "react";
import Link from "next/link";
import {TbError404} from "react-icons/tb";
import {Section} from "@/app/shared/components/Section";

const Custom404: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Section>
                <div className=" p-8 rounded-lg text-center">
                    <TbError404 className="text-6xl mb-4"/>
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
            </Section>
        </div>
    );
};

export default Custom404;
