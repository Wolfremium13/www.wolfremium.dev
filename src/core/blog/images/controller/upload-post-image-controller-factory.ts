import {UploadPostImageController} from "@/core/blog/images/controller/upload-post-image-controller";
import {UploadImageService} from "@/core/blog/images/use-case/upload-image-service";
import {FileStorageFactory} from "@/core/shared/storage/file-storage-factory";

export class UploadPostImageControllerFactory {
    static create() {
        const fileStorage = FileStorageFactory.create();
        const uploadImage = new UploadImageService(fileStorage);
        return new UploadPostImageController(uploadImage);
    }
}