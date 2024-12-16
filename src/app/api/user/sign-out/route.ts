import {UserSignOutControllerFactory} from "@/core/user/sign-out/controller/user-sign-out-controller-factory";

export async function GET(request: Request) {
    const controller = UserSignOutControllerFactory.create();
    return controller.get(request);
}