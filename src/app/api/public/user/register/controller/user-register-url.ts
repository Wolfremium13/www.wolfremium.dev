import {ApiEndpoint, SERVER_URL} from "@/app/api/server-url";

export const UserRegisterUrl: ApiEndpoint = {
    relative: "/api/public/user/register",
    full: `${SERVER_URL.current}/api/public/user/register`
}