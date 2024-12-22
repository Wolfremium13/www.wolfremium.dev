import {FilePath} from "@/core/storage/models/file-path";
import {FileDownloadUrl} from "@/core/storage/models/file-download-url";
import {FileToBeSaved} from "@/core/storage/models/file-to-be-saved";


export interface FileStorage {
  save(fileToBeSaved: FileToBeSaved, path: FilePath): Promise<FileDownloadUrl>
}
