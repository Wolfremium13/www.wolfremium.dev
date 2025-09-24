import {LoggedInUser} from "@/app/api/public/user/login/models/logged-in-user";
import {Password} from "@/app/api/public/user/models/password";
import {Email} from "@/app/api/public/user/models/email";

export interface Authentication {
    loginWith(email: Email, password: Password): Promise<LoggedInUser>;
}