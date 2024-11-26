import {Email} from "@/core/shared/models/email";

export interface ForgotPassword {
    resetPassword(email: Email): Promise<void>;
}