import {Authentication} from "@/core/user/login/use-case/authentication";
import {JwtUuid} from "@/core/shared/auth/models/jwt-uuid";
import {JwtRole} from "@/core/shared/auth/models/jwt-role";
import {Email} from "@/core/shared/models/email";
import {Password} from "@/core/shared/models/password";
import {JwtApi} from "@/core/shared/auth/engine/jwt-api";
import {
    AuthenticationException,
    InvalidParameterException,
    MissingParameterException,
    NotFoundException
} from "@/core/shared/exceptions";

export class UserLoginController {
    constructor(
        private readonly authentication: Authentication,
        private readonly sanitizer: Sanitizer,
        private readonly jwtApi: JwtApi,
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
            return new Response(
                JSON.stringify({uid: loggedInUser.uuid(), email: loggedInUser.email()}),
                {
                    status: 200,
                    headers: {
                        "Set-Cookie": `auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
                    }
                }
            );
        } catch (error: unknown) {
            return this.handleErrors(error);
        }
    }

    private handleErrors(error: unknown) {
        if (error instanceof MissingParameterException || error instanceof InvalidParameterException) {
            return new Response(JSON.stringify({error: error.message}), {
                status: 400,
            });
        }
        if (error instanceof NotFoundException) {
            return new Response(JSON.stringify({error: error.message}), {
                status: 404,
            });
        }

        if (error instanceof AuthenticationException) {
            return new Response(JSON.stringify({error: error.message}), {
                status: 401,
            });
        }

        if (error instanceof Error) {
            return new Response(JSON.stringify({error: error.message}), {
                status: 500,
            });
        }
        return new Response(
            JSON.stringify({error: "Unknown error while login user"}),
            {status: 500}
        );
    }
}