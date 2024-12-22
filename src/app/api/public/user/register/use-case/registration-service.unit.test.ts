import {describe, expect, it} from "vitest"
import {mock} from 'vitest-mock-extended';
import {Email} from "@/app/api/public/user/models/email";
import {UserRegistration} from "@/app/api/public/user/register/proxy/user-registration";
import {RegistrationService} from "@/app/api/public/user/register/use-case/registration-service";
import {Password} from "@/app/api/public/user/models/password";

describe("Registration service should", () => {
    it("register a user", async () => {
        const userRegistration = mock<UserRegistration>();
        const registrationService = new RegistrationService(userRegistration);
        const email = Email.create('validemail@email.com');
        const password = Password.create('Password123@');

        await registrationService.registerWith(email, password);

        expect(userRegistration.register).toHaveBeenCalledWith(email, password);
    })
});