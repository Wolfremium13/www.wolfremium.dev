import {Press_Start_2P} from "next/font/google";

const pressFont = Press_Start_2P({weight: "400", subsets: ["latin"]});
const LoginForm = () => {
    return (
        <div className={"border-2 border-darkGreen p-4 rounded-xl w-full max-w-md bg-gray-900/70 flex flex-col gap-4"}>
            <h1 className={pressFont.className}>
                <span className={"text-lightGreen text-3xl"}>Login</span>
            </h1>
            <input type="text" placeholder="Username" minLength={6} required={true} aria-label={"Username"}
                   className={"rounded-md bg-darkViolet p-2 text-white"} autoComplete={"true"}/>
            <input type="password" placeholder="Password" minLength={6} required={true} aria-label={"Password"}
                   className={"rounded-md bg-darkViolet p-2 text-white"} autoComplete={"true"}/>
            <a href="#" className={"text-lightViolet text-sm"}>Forgot password?</a>
            <button className={"bg-darkGreen text-white p-2 rounded-md"}>Login</button>
        </div>
    );
}
export default LoginForm;