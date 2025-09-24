import {Email} from "@/app/api/public/user/models/email";
import {Password} from "@/app/api/public/user/models/password";

export interface Registration {
    registerWith: (email: Email, password: Password) => Promise<void>;
}