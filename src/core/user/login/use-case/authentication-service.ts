import {Authentication} from "@/core/user/login/use-case/authentication";
import {Email} from "@/core/shared/models/email";
import {Password} from "@/core/shared/models/password";
import {LoggedInUser} from "@/core/user/login/models/logged-in-user";
import {UserAuthentication} from "@/core/user/login/proxy/user-authentication";

export class AuthenticationService implements Authentication {
    constructor(private readonly authentication: UserAuthentication) {
    }

    async loginWith(email: Email, password: Password): Promise<LoggedInUser> {
        return this.authentication.login(email, password);
    }
}
