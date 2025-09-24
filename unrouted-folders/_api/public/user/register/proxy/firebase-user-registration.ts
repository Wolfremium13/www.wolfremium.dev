import {FirebaseAdapter} from "@/core/firebase/firebase-adapter";
import {Email} from "@/app/api/public/user/models/email";
import {Password} from "@/app/api/public/user/models/password";
import {UserRegistration} from "@/app/api/public/user/register/proxy/user-registration";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {doc, setDoc} from "@firebase/firestore";
import {DatabaseException} from "@/core/exceptions/exceptions";
import {Logger} from "@/core/logging/logger";

export class FirebaseUserRegistration implements UserRegistration {
    constructor(
        private readonly firebaseAdapter: FirebaseAdapter,
        private readonly logger: Logger
    ) {
    }

    async register(email: Email, password: Password): Promise<void> {
        try {
            const auth = this.firebaseAdapter.auth;
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.value(),
                password.value()
            );
            const user = userCredential.user;
            await setDoc(doc(this.firebaseAdapter.firestore, "users", user.uid), {
                email: user.email,
                role: "user",
            });
            this.logger.info(`User created with email: ${user.email}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error while creating user: ${error.message}`);
                throw new DatabaseException("Error while creating user");
            }
            throw new Error("Unknown error while creating user");
        }
    }
}