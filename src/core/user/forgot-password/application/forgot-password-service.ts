import {ForgotPassword} from "@/core/user/forgot-password/application/forgot-password";
import {Email} from "@/core/shared/models/email";
import {PasswordResetter} from "@/core/user/forgot-password/infrastructure/proxies/password-resetter";

export class ForgotPasswordService implements ForgotPassword {
    constructor(private readonly passwordResetter: PasswordResetter) {
    }

    async resetPassword(email: Email): Promise<void> {
        await this.passwordResetter.reset(email);
    }
}