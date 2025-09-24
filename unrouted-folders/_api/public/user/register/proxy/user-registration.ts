import {Password} from "@/app/api/public/user/models/password";
import {Email} from "@/app/api/public/user/models/email";

export interface UserRegistration {
    register: (email: Email, password: Password) => Promise<void>;
}