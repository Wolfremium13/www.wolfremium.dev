import {Email} from "@/core/shared/models/email";
import {ForgotPassword} from "@/core/user/forgot-password/use-case/forgot-password";
import {PasswordResetter} from "@/core/user/forgot-password/proxy/password-resetter";

export class ForgotPasswordService implements ForgotPassword {
    constructor(private readonly passwordResetter: PasswordResetter) {
    }

    async reset(email: Email): Promise<void> {
        await this.passwordResetter.reset(email);
    }
}