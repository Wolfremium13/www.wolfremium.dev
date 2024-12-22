import {ForgotPasswordService} from "@/app/api/public/user/forgot-password/use-case/forgot-password-service";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {FirebaseAdapterFactory} from "@/core/firebase/firebase-adapter-factory";
import {PasswordResetByEmail} from "@/app/api/public/user/forgot-password/proxy/password-reset-by-email";
import {ForgotPasswordController} from "@/app/api/public/user/forgot-password/controller/forgot-password-controller";

export class ForgotPasswordControllerFactory {
    static create() {
        const logger = ConsoleLoggerFactory.create();
        const adapter = FirebaseAdapterFactory.create();
        const passwordResetter = new PasswordResetByEmail(adapter, logger);
        const forgotPassword = new ForgotPasswordService(passwordResetter);
        return new ForgotPasswordController(forgotPassword);
    }
}