import {PostsPaginationControllerFactory} from "@/core/blog/pagination/controller/posts-pagination-controller-factory";

export async function GET(request: Request) {
    const controller = PostsPaginationControllerFactory.create();
    return controller.get(request);
}