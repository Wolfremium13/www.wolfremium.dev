import {Press_Start_2P} from "next/font/google";
import { GiDoorway } from "react-icons/gi";

const pressFont = Press_Start_2P({weight: "400", subsets: ["latin"]});
const LoginForm = () => {
    return (
        <div className={"border-2 border-darkGreen p-4 rounded-xl w-full max-w-md bg-gray-900/70 flex flex-col gap-4"}>
            <h1 className={`text-lg text-lightGreen ${pressFont.className} d-flex justify-center align-center`}>
                <GiDoorway size={45} className={"inline-block"}/>
                <span className={"ml-3 align-bottom"}>Pasaje al Abismo</span>
            </h1>
            <input type="text" placeholder="Astaroth" minLength={6} required={true} aria-label={"Username"}
                   className={"rounded-md bg-darkViolet p-2 text-white"} autoComplete={"true"}/>
            <input type="password" placeholder="OccultaVeritas" minLength={6} required={true} aria-label={"Password"}
                   className={"rounded-md bg-darkViolet p-2 text-white"} autoComplete={"true"}/>
            <a href="#" className={"text-lightViolet text-sm"}>¿Invocaste a las sombras y olvidaste la llave?</a>
            <button className={"bg-darkGreen hover:bg-lightViolet text-white p-2 rounded-md"}>Login</button>
        </div>
    );
}
export default LoginForm;