import {Email} from "@/core/shared/models/email";
import {InvalidParameterException} from "@/core/shared/exceptions";
import {ForgotPassword} from "@/core/user/forgot-password/use-case/forgot-password";

export class ForgotPasswordController {
    constructor(private readonly forgotPassword: ForgotPassword) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const email = Email.create((await request.json()).email);
            await this.forgotPassword.reset(email);
            return new Response(JSON.stringify({message: `Email sent to ${email.value()}`}), {status: 200});
        } catch (e: unknown) {
            if (e instanceof InvalidParameterException) {
                return new Response(JSON.stringify({error: e.message}), {status: 400});
            }
            return new Response(JSON.stringify({error: "Unknown error while reset password"}), {status: 500});
        }
    }
}