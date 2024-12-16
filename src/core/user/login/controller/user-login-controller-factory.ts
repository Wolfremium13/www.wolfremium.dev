import {UserLoginController} from "@/core/user/login/controller/user-login-controller";
import {AuthenticationService} from "@/core/user/login/use-case/authentication-service";
import {FirebaseUserAuthentication} from "@/core/user/login/proxy/firebase-user-authentication";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";
import {SanitizerFactory} from "@/core/shared/security/sanitizer-factory";
import {JwtWebFactory} from "@/core/shared/auth/jwt-web-factory";
import {JwtApiFactory} from "@/core/shared/auth/jwt-api-factory";

export class UserLoginControllerFactory {
    static create() {
        const adapter = FirebaseAdapterFactory.create();
        const userAuthentication = new FirebaseUserAuthentication(adapter);
        const authenticationService = new AuthenticationService(userAuthentication);
        const sanitizer = SanitizerFactory.create();
        const jwtApi = JwtWebFactory.create();
        const jwtFirebase = JwtApiFactory.create();
        return new UserLoginController(authenticationService, sanitizer, jwtApi, jwtFirebase);
    }
}