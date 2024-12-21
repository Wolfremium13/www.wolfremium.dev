import {Section} from "@/core/shared/ui/components/Section";
import Link from "next/link";
import React from "react";
import {GiDialPadlock} from "react-icons/gi";

const UnauthorizedPage = () => {
    return (
        <div className={"flex justify-center items-start"}>
            <Section>
                <div className={"p-8 rounded-lg text-center"}>
                    <h1 className="text-2xl font-bold mb-4">
                        <GiDialPadlock className="text-6xl mb-4"/>
                        <span className="text-lightGreen">401</span> No autorizado
                    </h1>
                    <p className="mb-4">
                        Por favor inicia sesión con un usuario autorizado.
                    </p>
                    <button className="bg-darkViolet text-lightGreen px-4 py-2 rounded-lg hover:bg-mediumViolet hover:text-white border border-lightGreen">
                        <Link href="/user/login">Iniciar sesión</Link>
                    </button>
                </div>
            </Section>
        </div>
    );
}

export default UnauthorizedPage;