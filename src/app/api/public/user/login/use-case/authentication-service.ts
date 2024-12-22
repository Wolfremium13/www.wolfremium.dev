import {Authentication} from "@/app/api/public/user/login/use-case/authentication";
import {Email} from "@/app/api/public/user/models/email";
import {Password} from "@/app/api/public/user/models/password";
import {LoggedInUser} from "@/app/api/public/user/login/models/logged-in-user";
import {UserAuthentication} from "@/app/api/public/user/login/proxy/user-authentication";

export class AuthenticationService implements Authentication {
    constructor(private readonly authentication: UserAuthentication) {
    }

    async loginWith(email: Email, password: Password): Promise<LoggedInUser> {
        return this.authentication.login(email, password);
    }
}
