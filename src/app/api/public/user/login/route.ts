import {UserLoginControllerFactory} from "@/app/api/public/user/login/controller/user-login-controller-factory";

export async function POST(request: Request) {
    const controller = UserLoginControllerFactory.create();
    return controller.post(request);
}