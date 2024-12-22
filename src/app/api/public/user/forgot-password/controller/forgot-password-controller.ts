import {Email} from "@/app/api/public/user/models/email";
import {ForgotPassword} from "@/app/api/public/user/forgot-password/use-case/forgot-password";
import {httpExceptionsHandler} from "@/core/exceptions/http-exceptions-handler";

export class ForgotPasswordController {
    constructor(private readonly forgotPassword: ForgotPassword) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const email = Email.create((await request.json()).email);
            await this.forgotPassword.reset(email);
            return new Response(JSON.stringify({message: `Email sent to ${email.value()}`}), {status: 200});
        } catch (e: unknown) {
            return httpExceptionsHandler(e);
        }
    }
}