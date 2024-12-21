import {UploadPostImageController} from "@/core/blog/images/controller/upload-post-image-controller";
import {UploadImageService} from "@/core/blog/images/use-case/upload-image-service";
import {FileStorageFactory} from "@/core/shared/storage/file-storage-factory";
import {JwtWebFactory} from "@/core/shared/auth/jwt-web-factory";
import {PostAuthenticationService} from "@/core/blog/posts/use-case/post-authentication-service";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";

export class UploadPostImageControllerFactory {
    static create() {
        const jwtApi = JwtWebFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postAuth = new PostAuthenticationService(jwtApi, logger);
        const fileStorage = FileStorageFactory.create();
        const uploadImage = new UploadImageService(fileStorage);
        return new UploadPostImageController(uploadImage, postAuth);
    }
}