import {ApiEndpoint, SERVER_URL} from "@/app/api/server-url";

export const UserSignOutUrl: ApiEndpoint = {
    relative: "/api/public/user/sign-out",
    full: `${SERVER_URL.current}/api/public/user/sign-out`
}