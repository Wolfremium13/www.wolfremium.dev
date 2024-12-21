import {PostsControllerFactory} from "@/core/blog/posts/controller/posts-controller-factory";

export async function GET(request: Request) {
    const controller = PostsControllerFactory.create();
    return controller.get(request);
}