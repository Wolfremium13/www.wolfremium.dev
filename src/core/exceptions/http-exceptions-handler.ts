import {
    AuthenticationException,
    ClientSideException,
    NotFoundException,
    ServerSideException
} from "@/core/exceptions/exceptions";

export const httpExceptionsHandler = (e: unknown): Response => {
    if (e instanceof NotFoundException) {
        return new Response(JSON.stringify({error: e.message}), {status: 404});
    }
    if (e instanceof AuthenticationException) {
        return new Response(JSON.stringify({error: e.message}), {status: 401});
    }
    if (e instanceof ClientSideException) {
        return new Response(JSON.stringify({error: e.message}), {status: 400});
    }
    if (e instanceof ServerSideException) {
        return new Response(JSON.stringify({error: e.message}), {status: 500});
    }
    return new Response(JSON.stringify({error: "Unknown error"}), {status: 500});
}