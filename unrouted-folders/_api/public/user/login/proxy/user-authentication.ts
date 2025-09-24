import {Password} from "@/app/api/public/user/models/password";
import {Email} from "@/app/api/public/user/models/email";
import {LoggedInUser} from "@/app/api/public/user/login/models/logged-in-user";

export interface UserAuthentication {
    login(email: Email, password: Password): Promise<LoggedInUser>;
}