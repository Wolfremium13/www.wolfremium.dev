import {ForgotPasswordController} from "@/core/user/forgot-password/controllers/forgot-password-controller";
import {ForgotPasswordService} from "@/core/user/forgot-password/use-case/forgot-password-service";
import {PasswordResetByEmail} from "@/core/user/forgot-password/proxies/password-reset-by-email";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";

export class ForgotPasswordControllerFactory {
    static create() {
        const logger = ConsoleLoggerFactory.create();
        const adapter = FirebaseAdapterFactory.create();
        const passwordResetter = new PasswordResetByEmail(adapter, logger);
        const forgotPassword = new ForgotPasswordService(passwordResetter);
        return new ForgotPasswordController(forgotPassword);
    }
}