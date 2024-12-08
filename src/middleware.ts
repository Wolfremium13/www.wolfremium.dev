import {NextResponse, type NextRequest} from "next/server";
import {JwtFactory} from "./core/shared/auth/jwt-factory";
import {JwtToken} from "./core/shared/auth/models/jwt-token";

export async function middleware(request: NextRequest) {
    const jwtApi = JwtFactory.create();
    const token = request.cookies.get("auth")?.value ?? "";
    try {
        const payload = await jwtApi.verify(JwtToken.create(token));
        if (!payload.isAdministrator()) {
            return NextResponse.redirect(new URL("/user/unauthorized", request.url));
        }
        return NextResponse.next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return NextResponse.redirect(new URL("/user/unauthorized", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};