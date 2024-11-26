import {FileDownloadUrl} from "@/core/shared/storage/domain/file-download-url";
import {FilePath} from "@/core/shared/storage/domain/file-path";
import {FileToBeSaved} from "@/core/shared/storage/domain/file-to-be-saved";

export interface FileStorage {
  save(fileToBeSaved: FileToBeSaved, path: FilePath): Promise<FileDownloadUrl>
}
