import {UserRegistration} from "@/core/user/register/proxy/user-registration";
import {Email} from "@/core/shared/models/email";
import {Password} from "@/core/shared/models/password";
import {ClientSideException, ServerSideException} from "@/core/shared/exceptions";

export class UserRegistrationController {
    constructor(
        private readonly userRegistration: UserRegistration,
        private readonly sanitizer: Sanitizer
    ) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const {email, password} = await request.json();
            const sanitizedEmail = Email.create(this.sanitizer.sanitize(email));
            const sanitizedPassword = Password.create(this.sanitizer.sanitize(password));
            await this.userRegistration.register(sanitizedEmail, sanitizedPassword);
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