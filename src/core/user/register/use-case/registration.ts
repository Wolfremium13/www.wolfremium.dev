import {Email} from "@/core/shared/models/email";
import {Password} from "@/core/shared/models/password";

export interface Registration {
    registerWith: (email: Email, password: Password) => Promise<void>;
}