import {UploadImage} from "@/core/blog/images/use-case/upload-image";
import {FileToBeSaved} from "@/core/shared/storage/models/file-to-be-saved";
import {FileStorage} from "@/core/shared/storage/file-storage";
import {FilePath} from "@/core/shared/storage/models/file-path";
import {PostImageUrl} from "@/core/blog/shared/models/post-image-url";

export class UploadImageService implements UploadImage {
    constructor(private readonly fileStorage: FileStorage) {
    }

    async upload(file: FileToBeSaved): Promise<PostImageUrl> {
        const fileUrl = await this.fileStorage.save(file, FilePath.create("posts"));
        return PostImageUrl.create(fileUrl.url);
    }
}