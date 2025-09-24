import {ApiEndpoint, SERVER_URL} from "@/app/api/server-url";

export const UserLoginUrl: ApiEndpoint = {
    relative: "/api/public/user/login",
    full: `${SERVER_URL.current}/api/public/user/login`
}