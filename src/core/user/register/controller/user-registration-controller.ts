import {Email} from "@/core/shared/models/email";
import {Password} from "@/core/shared/models/password";
import {ClientSideException, ServerSideException} from "@/core/shared/exceptions";
import {Registration} from "@/core/user/register/use-case/registration";

export class UserRegistrationController {
    constructor(
        private readonly registration: Registration,
        private readonly sanitizer: Sanitizer
    ) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const {email, password} = await request.json();
            const sanitizedEmail = Email.create(this.sanitizer.sanitize(email));
            const sanitizedPassword = Password.create(this.sanitizer.sanitize(password));
            await this.registration.registerWith(sanitizedEmail, sanitizedPassword);
            return new Response(JSON.stringify({message: "User created successfully"}), {status: 201});
        } catch (error: unknown) {
            if (error instanceof ClientSideException) {
                return new Response(JSON.stringify({error: error.message}), {status: 400});
            }

            if (error instanceof ServerSideException) {
                return new Response(JSON.stringify({error: error.message}), {status: 500});
            }

            return new Response(
                JSON.stringify({error: "Unknown error while creating user"}),
                {status: 500}
            );
        }
    }
}