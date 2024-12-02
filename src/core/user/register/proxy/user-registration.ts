import {Password} from "@/core/shared/models/password";
import {Email} from "@/core/shared/models/email";

export interface UserRegistration {
    register: (email: Email, password: Password) => Promise<void>;
}