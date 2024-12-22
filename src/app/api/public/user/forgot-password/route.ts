import {
    ForgotPasswordControllerFactory
} from "@/app/api/public/user/forgot-password/controller/forgot-password-controller-factory";

export async function POST(request: Request) {
    const controller = ForgotPasswordControllerFactory.create();
    return controller.post(request);
}