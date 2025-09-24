import {UserRegistration} from "@/app/api/public/user/register/proxy/user-registration";
import {Email} from "@/app/api/public/user/models/email";
import {Password} from "@/app/api/public/user/models/password";
import {Registration} from "@/app/api/public/user/register/use-case/registration";

export class RegistrationService implements Registration {
    constructor(private readonly userRegistration: UserRegistration) {
    }

    async registerWith(email: Email, password: Password): Promise<void> {
        await this.userRegistration.register(email, password);
    }
}