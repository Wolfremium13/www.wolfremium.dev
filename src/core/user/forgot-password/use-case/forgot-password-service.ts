import {Email} from "@/core/shared/models/email";
import {PasswordResetter} from "@/core/user/forgot-password/proxies/password-resetter";
import {ForgotPassword} from "@/core/user/forgot-password/use-case/forgot-password";

export class ForgotPasswordService implements ForgotPassword {
    constructor(private readonly passwordResetter: PasswordResetter) {
    }

    async resetPassword(email: Email): Promise<void> {
        await this.passwordResetter.reset(email);
    }
}