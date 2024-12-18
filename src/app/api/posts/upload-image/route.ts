import {UploadPostImageControllerFactory} from "@/core/blog/images/controller/upload-post-image-controller-factory";

export async function POST(request: Request) {
    const controller = UploadPostImageControllerFactory.create();
    return controller.post(request);
}