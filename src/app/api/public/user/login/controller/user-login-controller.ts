import {Authentication} from "@/app/api/public/user/login/use-case/authentication";
import {JwtUuid} from "@/core/auth/models/jwt-uuid";
import {JwtRole} from "@/core/auth/models/jwt-role";
import {Email} from "@/app/api/public/user/models/email";
import {Password} from "@/app/api/public/user/models/password";
import {JwtApi} from "@/core/auth/engine/jwt-api";
import {
    AuthenticationException,
    InvalidParameterException,
    MissingParameterException,
    NotFoundException
} from "@/core/exceptions/exceptions";
import {JwtFirebase} from "@/core/auth/engine/jwt-firebase";
import {httpExceptionsHandler} from "@/core/exceptions/http-exceptions-handler";

export class UserLoginController {
    constructor(
        private readonly authentication: Authentication,
        private readonly sanitizer: Sanitizer,
        private readonly jwtApi: JwtApi,
        private readonly jwtFirebase: JwtFirebase
    ) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const {email, password} = await request.json();
            const sanitizedEmail = Email.create(this.sanitizer.sanitize(email));
            const sanitizedPassword = Password.create(this.sanitizer.sanitize(password));
            const loggedInUser = await this.authentication.loginWith(sanitizedEmail, sanitizedPassword);
            const jwtUuid = JwtUuid.create(loggedInUser.uuid());
            const jwtRole = JwtRole.create(loggedInUser.role());
            const token = await this.jwtApi.sign(jwtUuid, jwtRole);
            const firebaseToken = await this.jwtFirebase.sign(jwtUuid, jwtRole);
            return new Response(
                JSON.stringify({uid: loggedInUser.uuid(), email: loggedInUser.email()}),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                        "Set-Cookie":
                            `auth=${token.value}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400, ` +
                            `api_auth=${firebaseToken.value}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400`,
                    },
                }
            );
        } catch (error: unknown) {
            return httpExceptionsHandler(error);
        }
    }
}