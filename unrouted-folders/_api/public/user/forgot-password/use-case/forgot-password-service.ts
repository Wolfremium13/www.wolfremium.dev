import {Email} from "@/app/api/public/user/models/email";
import {ForgotPassword} from "@/app/api/public/user/forgot-password/use-case/forgot-password";
import {PasswordResetter} from "@/app/api/public/user/forgot-password/proxy/password-resetter";

export class ForgotPasswordService implements ForgotPassword {
    constructor(private readonly passwordResetter: PasswordResetter) {
    }

    async reset(email: Email): Promise<void> {
        await this.passwordResetter.reset(email);
    }
}