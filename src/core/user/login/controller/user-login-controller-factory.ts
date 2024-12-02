import {UserLoginController} from "@/core/user/login/controller/user-login-controller";
import {AuthenticationService} from "@/core/user/login/use-case/authentication-service";
import {FirebaseUserAuthentication} from "@/core/user/login/proxy/firebase-user-authentication";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";
import {SanitizerFactory} from "@/core/shared/security/sanitizer-factory";
import {JwtFactory} from "@/core/shared/auth/jwt-factory";

export class UserLoginControllerFactory {
    static create() {
        const adapter = FirebaseAdapterFactory.create();
        const userAuthentication = new FirebaseUserAuthentication(adapter);
        const authenticationService = new AuthenticationService(userAuthentication);
        const sanitizer = SanitizerFactory.create();
        const jwtApi = JwtFactory.create();
        return new UserLoginController(authenticationService, sanitizer, jwtApi);
    }
}