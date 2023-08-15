import { signJwtAccessToken } from "@/lib/jwt";


interface RequestBody {
    username: string;
    password: string;
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const user = process.env.ADMIN_USER;
    const pass = process.env.ADMIN_PASS;
    const canLogin = body.username === user && body.password === pass;
    if (canLogin) {
        const userWithoutPass = {
            username: user,
        };
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken,
        };
        return new Response(JSON.stringify(result));
    }
    return new Response(JSON.stringify(null));
}