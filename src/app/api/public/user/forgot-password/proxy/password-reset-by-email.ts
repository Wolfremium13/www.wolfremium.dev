import {sendPasswordResetEmail} from "@firebase/auth";
import {FirebaseAdapter} from "@/core/firebase/firebase-adapter";
import {Logger} from "@/core/logging/logger";
import {Email} from "@/app/api/public/user/models/email";
import {PasswordResetter} from "@/app/api/public/user/forgot-password/proxy/password-resetter";
import {DatabaseException} from "@/core/exceptions/exceptions";

export class PasswordResetByEmail implements PasswordResetter {
    constructor(private readonly firebaseAdapter: FirebaseAdapter, private readonly logger: Logger) {
    }

    async reset(email: Email): Promise<void> {
        const auth = this.firebaseAdapter.auth;
        await sendPasswordResetEmail(auth, email.value())
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    this.logger.error(`Error while resenting password: ${error.message}`);
                    throw error;
                }
                this.logger.error("Unknown error while resenting password");
                throw new DatabaseException("Unknown error while resenting password");
            });
        this.logger.info(`Password reset email sent to ${email.value()}`);
    }
}