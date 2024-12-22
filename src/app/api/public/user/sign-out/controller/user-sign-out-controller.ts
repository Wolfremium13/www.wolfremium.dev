import {Logger} from "@/core/logging/logger";
import {httpExceptionsHandler} from "@/core/exceptions/http-exceptions-handler";

export class UserSignOutController {
    constructor(private readonly logger : Logger) {
    }

    async get(_: Request): Promise<Response> {
        try {
            const response = new Response(null, {status: 302});
            response.headers.set('Location', '/');
            response.headers.append('Set-Cookie', 'api_auth=; HttpOnly; Path=/; Max-Age=0');
            response.headers.append('Set-Cookie', 'auth=; HttpOnly; Path=/; Max-Age=0');
            return response;
        } catch (error) {
            if (error instanceof Error) {
                this.logger.error(error.message);
            }
            return httpExceptionsHandler(error);
        }
    }
}