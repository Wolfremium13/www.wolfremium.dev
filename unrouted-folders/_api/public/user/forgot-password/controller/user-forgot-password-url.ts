import {ApiEndpoint, SERVER_URL} from "@/app/api/server-url";

export const UserForgotPasswordUrl: ApiEndpoint = {
    relative: "/api/public/user/forgot-password",
    full: `${SERVER_URL.current}/api/public/user/forgot-password`
}