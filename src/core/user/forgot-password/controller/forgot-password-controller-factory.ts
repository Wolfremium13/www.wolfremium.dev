import {ForgotPasswordService} from "@/core/user/forgot-password/use-case/forgot-password-service";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";
import {PasswordResetByEmail} from "@/core/user/forgot-password/proxy/password-reset-by-email";
import {ForgotPasswordController} from "@/core/user/forgot-password/controller/forgot-password-controller";

export class ForgotPasswordControllerFactory {
    static create() {
        const logger = ConsoleLoggerFactory.create();
        const adapter = FirebaseAdapterFactory.create();
        const passwordResetter = new PasswordResetByEmail(adapter, logger);
        const forgotPassword = new ForgotPasswordService(passwordResetter);
        return new ForgotPasswordController(forgotPassword);
    }
}