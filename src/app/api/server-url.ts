export const SERVER_URL = {
    current: process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000",
}

export type ApiEndpoint = {
    relative: string;
    full: string;
}