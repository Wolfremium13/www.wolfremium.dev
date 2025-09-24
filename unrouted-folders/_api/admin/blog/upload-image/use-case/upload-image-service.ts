import {UploadImage} from "@/app/api/admin/blog/upload-image/use-case/upload-image";
import {FileToBeSaved} from "@/core/storage/models/file-to-be-saved";
import {FileStorage} from "@/core/storage/file-storage";
import {FilePath} from "@/core/storage/models/file-path";
import {PostImageUrl} from "@/app/api/admin/blog/posts/models/blog/shared/models/post-image-url";
import {UuidManager} from "@/core/uuid-manager/uuid-manager";

export class UploadImageService implements UploadImage {
    constructor(
        private readonly fileStorage: FileStorage,
        private readonly uuidManager: UuidManager
    ) {
    }

    async upload(file: FileToBeSaved): Promise<PostImageUrl> {
        const fileUrl = await this.fileStorage.save(file, FilePath.create(`posts`));
        return PostImageUrl.create(fileUrl.url);
    }
}