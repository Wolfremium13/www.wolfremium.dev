import {FileToBeSaved} from "@/core/storage/models/file-to-be-saved";
import {PostImageUrl} from "@/app/api/admin/blog/posts/models/blog/shared/models/post-image-url";

export interface UploadImage {
    upload: (file: FileToBeSaved) => Promise<PostImageUrl>
}