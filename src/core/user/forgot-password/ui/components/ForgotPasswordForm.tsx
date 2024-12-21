"use client";
import {Press_Start_2P} from "next/font/google";
import {GiCrossMark} from "react-icons/gi";
import {useState} from "react";
import {ForgotPasswordControllerClient} from "@/core/user/forgot-password/controller/forgot-password-controller-client";
import Link from "next/link";

const pressFont = Press_Start_2P({weight: "400", subsets: ["latin"]});
export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            await ForgotPasswordControllerClient(email, setLoading, setError, setSubmitted);
            setSubmitted(true);
            setError(null);
        } catch (e) {
            setError("No se pudo enviar el correo de restablecimiento.");
        }
        setLoading(false);
    };

    return (
        <div className={"border-2 border-darkGreen p-4 rounded-xl w-full max-w-md md:max-w-lg bg-gray-900/70 flex flex-col gap-4"}>
            <h1 className={`text-lg text-lightGreen ${pressFont.className} d-flex justify-center align-center`}>
                Restablecer contraseña
            </h1>
            {!submitted ? (
                <>
                    <input type="email" placeholder="Ingresa tu correo electrónico" required={true}
                           className={"rounded-md bg-darkViolet p-2 text-white border-2 border-darkGreen focus:outline-lightGreen"}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleResetPassword} disabled={!isValidEmail(email) || loading}
                            className={"bg-darkGreen hover:bg-lightViolet disabled:bg-darkViolet disabled:text-gray-500 disabled:cursor-not-allowed text-white p-2 rounded-md"}>
                        {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
                    </button>
                    {error && (<div className={"text-red-500 text-sm text-center"}>
                        <GiCrossMark size={20} className={"inline-block"}/>
                        <span className={"ml-2"}>{error}</span>
                    </div>)}
                </>
            ) : (
                <>
                    <p className="text-mediumViolet text-center">
                        Si encontramos una cuenta asociada con ese correo electrónico, recibirás un enlace para
                        restablecer
                        tu contraseña.
                    </p>
                    <Link href="/" className={"text-lightGreen text-center border-2 border-darkGreen p-2 rounded-md"}>
                        <span>Volver al inicio</span>
                    </Link>
                </>

            )}
        </div>
    );
}