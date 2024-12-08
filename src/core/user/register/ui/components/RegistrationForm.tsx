"use client";
import {Press_Start_2P} from "next/font/google";
import {GiCrossMark} from "react-icons/gi";
import {useState} from "react";
import {UserRegistrationControllerClient} from "@/core/user/register/controller/user-registration-controller-client";
import {useRouter} from 'next/navigation'


const pressFont = Press_Start_2P({weight: "400", subsets: ["latin"]});
const RegistrationForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const passwordsMatch = password === confirmPassword;
    const isFormValid = isValidEmail(email) && passwordsMatch && password.length >= 6;
    const redirectToLogin = async () => router.push("/user/login");

    const handleRegistration = async () => {
        if (!isFormValid) {
            setError("Por favor, asegúrate de que los campos están correctamente llenados y las contraseñas coinciden.");
            return;
        }
        await UserRegistrationControllerClient(email, password, setLoading, setError, redirectToLogin);
    };

    return (
        <div className={"border-2 border-darkGreen p-4 rounded-xl w-full max-w-md bg-gray-900/70 flex flex-col gap-4"}>
            <h1 className={`text-lg text-lightGreen ${pressFont.className} d-flex justify-center align-center`}>
                Registro de Usuario
            </h1>
            <input type="email" placeholder="Correo electrónico" required={true} name={"email"}
                   className={"rounded-md bg-darkViolet p-2 text-white border-2 border-darkGreen focus:outline-lightGreen"}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="Contraseña" minLength={6} required={true} name={"password"}
                   className={"rounded-md bg-darkViolet p-2 text-white border-2 border-darkGreen focus:outline-lightGreen"}
                   onChange={(e) => setPassword(e.target.value)}
            />
            <input type="password" placeholder="Confirma tu contraseña" minLength={6} required={true}
                   name={"confirmPassword"}
                   className={"rounded-md bg-darkViolet p-2 text-white border-2 border-darkGreen focus:outline-lightGreen"}
                   onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordsMatch && (
                <div className={"text-red-500 text-sm"}>
                    Las contraseñas no coinciden.
                </div>
            )}
            <button onClick={handleRegistration} disabled={!isFormValid || loading} name={"register"}
                    className={"bg-darkGreen hover:bg-lightViolet text-white p-2 rounded-md disabled:bg-darkViolet disabled:text-gray-700 disabled:cursor-not-allowed"}>
                {loading ? "Registrando..." : "Registrar"}
            </button>
            {error && (<div className={"text-red-500 text-sm text-center"}>
                <GiCrossMark size={20} className={"inline-block"}/>
                <span className={"ml-2"}>{error}</span>
            </div>)}
        </div>
    );
}
export default RegistrationForm;
