import {Email} from "@/app/api/public/user/models/email";

export interface PasswordResetter {
    reset(email: Email): Promise<void>;
}