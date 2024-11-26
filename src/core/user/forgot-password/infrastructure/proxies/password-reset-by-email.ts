import {Logger} from "@/core/shared/logging/logger";
import {FirebaseAdapter} from "@/core/shared/firebase/firebase-adapter";
import {PasswordResetter} from "@/core/user/forgot-password/infrastructure/proxies/password-resetter";
import {Email} from "@/core/shared/models/email";
import {sendPasswordResetEmail} from "@firebase/auth";

export class PasswordResetByEmail implements PasswordResetter {
    constructor(private readonly firebaseAdapter: FirebaseAdapter, private readonly logger: Logger) {
    }

    async reset(email: Email): Promise<void> {
        const auth = this.firebaseAdapter.auth;
        await sendPasswordResetEmail(auth, email.Value())
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    this.logger.error(`Error while resenting password: ${error.message}`);
                    throw error;
                }
                this.logger.error("Unknown error while resenting password");
                throw new Error("Unknown error while resenting password");
            });
    }
}