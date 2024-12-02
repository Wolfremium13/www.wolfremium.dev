import {Password} from "@/core/shared/models/password";
import {Email} from "@/core/shared/models/email";
import {LoggedInUser} from "@/core/user/login/models/logged-in-user";

export interface UserAuthentication {
    login(email: Email, password: Password): Promise<LoggedInUser>;
}