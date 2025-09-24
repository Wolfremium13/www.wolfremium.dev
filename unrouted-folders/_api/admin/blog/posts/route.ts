import {PostsAdminControllerFactory} from "@/app/api/admin/blog/posts/controller/posts-admin-controller-factory";

export async function POST(request: Request) {
    const controller = PostsAdminControllerFactory.create();
    return controller.post(request);
}

export async function GET(request: Request) {
    const controller = PostsAdminControllerFactory.create();
    return controller.get(request);
}

export async function DELETE(request: Request) {
    const controller = PostsAdminControllerFactory.create();
    return controller.delete(request);
}

export async function PATCH(request: Request) {
    const controller = PostsAdminControllerFactory.create();
    return controller.patch(request);
}