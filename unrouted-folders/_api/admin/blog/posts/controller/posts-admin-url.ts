import {ApiEndpoint, SERVER_URL} from "@/app/api/server-url";

export const PostsAdminUrl: ApiEndpoint = {
    relative: "/api/admin/blog/posts",
    full: `${SERVER_URL.current}/api/admin/blog/posts`,
}