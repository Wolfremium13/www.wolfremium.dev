import {PostsManagementControllerFactory} from "@/core/blog/posts/controller/posts-management-controller-factory";

export async function POST(request: Request) {
    const controller = PostsManagementControllerFactory.create();
    return controller.post(request);
}

export async function GET(request: Request) {
    const controller = PostsManagementControllerFactory.create();
    return controller.get(request);
}

export async function DELETE(request: Request) {
    const controller = PostsManagementControllerFactory.create();
    return controller.delete(request);
}