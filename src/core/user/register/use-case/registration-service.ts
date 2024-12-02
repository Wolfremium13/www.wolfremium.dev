import {UserRegistration} from "@/core/user/register/proxy/user-registration";
import {Email} from "@/core/shared/models/email";
import {Password} from "@/core/shared/models/password";
import {Registration} from "@/core/user/register/use-case/registration";

export class RegistrationService implements Registration {
    constructor(private readonly userRegistration: UserRegistration) {
    }

    async registerWith(email: Email, password: Password): Promise<void> {
        await this.userRegistration.register(email, password);
    }
}