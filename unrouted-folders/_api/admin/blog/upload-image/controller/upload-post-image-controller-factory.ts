import {UploadPostImageController} from "@/app/api/admin/blog/upload-image/controller/upload-post-image-controller";
import {UploadImageService} from "@/app/api/admin/blog/upload-image/use-case/upload-image-service";
import {FileStorageFactory} from "@/core/storage/file-storage-factory";
import {JwtWebFactory} from "@/core/auth/jwt-web-factory";
import {PostAuthenticationService} from "@/app/api/admin/blog/posts/use-case/post-authentication-service";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {UuidManagerFactory} from "@/core/uuid-manager/uuid-manager-factory";

export class UploadPostImageControllerFactory {
    static create() {
        const jwtApi = JwtWebFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postAuth = new PostAuthenticationService(jwtApi, logger);
        const fileStorage = FileStorageFactory.create();
        const uuidManager = UuidManagerFactory.create();
        const uploadImage = new UploadImageService(fileStorage, uuidManager);
        return new UploadPostImageController(uploadImage, postAuth);
    }
}