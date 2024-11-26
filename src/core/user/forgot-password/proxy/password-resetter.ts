import {Email} from "@/core/shared/models/email";

export interface PasswordResetter {
    reset(email: Email): Promise<void>;
}