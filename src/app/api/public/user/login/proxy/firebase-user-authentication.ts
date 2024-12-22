import {UserAuthentication} from "@/app/api/public/user/login/proxy/user-authentication";
import {Email} from "@/app/api/public/user/models/email";
import {Password} from "@/app/api/public/user/models/password";
import {LoggedInUser} from "@/app/api/public/user/login/models/logged-in-user";
import {FirebaseAdapter} from "@/core/firebase/firebase-adapter";
import {signInWithEmailAndPassword, User} from "@firebase/auth";
import {doc, getDoc} from "@firebase/firestore";
import {AuthenticationException, NotFoundException} from "@/core/exceptions/exceptions";
import {Uuid} from "@/core/uuid-manager/uuid";

export class FirebaseUserAuthentication implements UserAuthentication {
    constructor(private readonly firebaseAdapter: FirebaseAdapter) {
    }

    async login(email: Email, password: Password): Promise<LoggedInUser> {
        const firebaseUser = await this.getSignedUserInfo(email, password);
        const role = await this.getRoleBy(firebaseUser.uid);
        return LoggedInUser.create(
            Uuid.create(firebaseUser.uid),
            email,
            role
        );
    }

    private async getSignedUserInfo(email: Email, password: Password): Promise<User> {
        try {
            const auth = this.firebaseAdapter.auth;
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email.value(),
                password.value()
            );
            return userCredential.user;
        } catch (error: unknown) {
            throw new AuthenticationException("Email or password is incorrect");
        }
    }

    private async getRoleBy(uuid: string): Promise<string> {
        const userDoc = await getDoc(
            doc(this.firebaseAdapter.firestore, "users", uuid)
        );
        if (!userDoc.exists()) {
            throw new NotFoundException("User not found");
        }
        const {role} = userDoc.data();
        return role;
    }
}