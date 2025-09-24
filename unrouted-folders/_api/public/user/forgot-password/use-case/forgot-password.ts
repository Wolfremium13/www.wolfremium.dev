import {Email} from "@/app/api/public/user/models/email";

export interface ForgotPassword {
    reset(email: Email): Promise<void>;
}