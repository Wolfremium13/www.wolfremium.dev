import {FilePath} from "@/core/shared/storage/models/file-path";
import {FileDownloadUrl} from "@/core/shared/storage/models/file-download-url";
import {FileToBeSaved} from "@/core/shared/storage/models/file-to-be-saved";


export interface FileStorage {
  save(fileToBeSaved: FileToBeSaved, path: FilePath): Promise<FileDownloadUrl>
}
