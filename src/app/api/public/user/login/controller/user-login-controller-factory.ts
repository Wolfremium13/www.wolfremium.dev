import {UserLoginController} from "@/app/api/public/user/login/controller/user-login-controller";
import {AuthenticationService} from "@/app/api/public/user/login/use-case/authentication-service";
import {FirebaseUserAuthentication} from "@/app/api/public/user/login/proxy/firebase-user-authentication";
import {FirebaseAdapterFactory} from "@/core/firebase/firebase-adapter-factory";
import {SanitizerFactory} from "@/core/security/sanitizer-factory";
import {JwtWebFactory} from "@/core/auth/jwt-web-factory";
import {JwtApiFactory} from "@/core/auth/jwt-api-factory";

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