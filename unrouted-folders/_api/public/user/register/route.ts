import {UserRegistrationControllerFactory} from "@/app/api/public/user/register/controller/user-registration-controller-factory";

export async function POST(request: Request) {
    const controller = UserRegistrationControllerFactory.create();
    return controller.post(request);
}