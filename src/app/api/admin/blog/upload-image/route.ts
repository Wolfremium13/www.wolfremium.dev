import {UploadPostImageControllerFactory} from "@/app/api/admin/blog/upload-image/controller/upload-post-image-controller-factory";

export async function POST(request: Request) {
    const controller = UploadPostImageControllerFactory.create();
    return controller.post(request);
}