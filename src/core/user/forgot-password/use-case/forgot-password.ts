import {Email} from "@/core/shared/models/email";

export interface ForgotPassword {
    reset(email: Email): Promise<void>;
}