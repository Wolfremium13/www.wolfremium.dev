import {sendPasswordResetEmail} from "@firebase/auth";
import {FirebaseAdapter} from "@/core/shared/firebase/firebase-adapter";
import {Logger} from "@/core/shared/logging/logger";
import {Email} from "@/core/shared/models/email";
import {PasswordResetter} from "@/core/user/forgot-password/proxy/password-resetter";

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
                throw new Error("Unknown error while resenting password");
            });
    }
}