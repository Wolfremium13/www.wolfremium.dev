"use client";
import {Press_Start_2P} from "next/font/google";
import {GiDoorway, GiCrossMark} from "react-icons/gi";
import {useState, useEffect} from "react";
import {UserLoginControllerClient} from "@/app/api/public/user/login/controller/user-login-controller-client";
import Link from "next/link";
import {useRouter} from "next/navigation";

const pressFont = Press_Start_2P({weight: "400", subsets: ["latin"]});
export const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [captcha, setCaptcha] = useState(0);
    const [userCaptcha, setUserCaptcha] = useState("");

    useEffect(() => {
        const newCaptcha = Math.floor(Math.random() * 10) + 1 + Math.floor(Math.random() * 10);
        setCaptcha(newCaptcha);
    }, []);

    const redirectToAdmin = async () => {
        router.push("/admin");
    }

    const handleLogin = async () => {
        if (parseInt(userCaptcha) !== captcha) {
            setError("Respuesta incorrecta del captcha");
            return;
        }
        await UserLoginControllerClient(email, password, setLoading, setError, redirectToAdmin);
        const newCaptcha = Math.floor(Math.random() * 10) + 1 + Math.floor(Math.random() * 10);
        setCaptcha(newCaptcha);
        setUserCaptcha("");
    };

    return (
        <div className={"border-2 border-darkGreen p-4 rounded-xl w-full max-w-md bg-gray-900/70 flex flex-col gap-4"}>
            <h1 className={`text-lg text-lightGreen ${pressFont.className} d-flex justify-center align-center`}>
                <GiDoorway size={45} className={"inline-block"}/>
                <span className={"ml-3 align-bottom"}>Pasaje al Abismo</span>
            </h1>
            <input type="text" placeholder="Astaroth" minLength={6} required={true} aria-label={"Username"}
                   className={"rounded-md bg-darkViolet p-2 text-white border-2 border-darkGreen focus:outline-lightGreen"}
                   autoComplete={"email"}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="OccultaVeritas" minLength={6} required={true} aria-label={"Password"}
                   className={"rounded-md bg-darkViolet p-2 text-white border-2 border-darkGreen focus:outline-lightGreen"}
                   autoComplete={"password"}
                   onChange={(e) => setPassword(e.target.value)}
            />
            <div className={"flex justify-between items-center"}>
                <span
                    className={`text-center p-2 text-lightGreen ${pressFont.className}`}>¿Cuánto es {Math.floor(captcha / 2)} + {captcha - Math.floor(captcha / 2)}?</span>
                <input type="text" required={true} onChange={(e) => setUserCaptcha(e.target.value)}
                       className={"w-20 rounded-md bg-darkViolet p-2 text-white border-2 border-darkGreen focus:outline-lightGreen"}
                />
            </div>
            <Link href={"/user/forgot-password"} className={"text-lightViolet text-sm"}> ¿Invocaste a las sombras y
                olvidaste
                la llave? </Link>

            <button onClick={handleLogin} disabled={loading}
                    className={"bg-darkGreen hover:bg-lightViolet text-white p-2 rounded-md"}> {loading ? "Cargando..." : "Ingresar"}
            </button>

            {error && (<div className={"text-red-500 text-sm text-center"}>
                <GiCrossMark size={20} className={"inline-block"}/>
                <span className={"ml-2"}>{error}</span>
            </div>)}
        </div>
    );
}
