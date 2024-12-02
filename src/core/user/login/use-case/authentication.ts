import {LoggedInUser} from "@/core/user/login/models/logged-in-user";
import {Password} from "@/core/shared/models/password";
import {Email} from "@/core/shared/models/email";

export interface Authentication {
    loginWith(email: Email, password: Password): Promise<LoggedInUser>;
}