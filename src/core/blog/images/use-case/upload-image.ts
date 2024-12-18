import {FileToBeSaved} from "@/core/shared/storage/models/file-to-be-saved";
import {PostImageUrl} from "@/core/blog/shared/models/post-image-url";

export interface UploadImage {
    upload: (file: FileToBeSaved) => Promise<PostImageUrl>
}