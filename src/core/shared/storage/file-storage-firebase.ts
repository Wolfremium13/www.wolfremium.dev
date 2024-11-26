import {FileStorage} from "@/core/shared/storage/file-storage";
import {FirebaseAdapter} from "@/core/shared/firebase/firebase-adapter";
import {FileDownloadUrl} from "../domain/file-download-url";
import {FilePath} from "../domain/file-path";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {FileToBeSaved} from "@/core/shared/storage/domain/file-to-be-saved";
import {Logger} from "@/core/shared/logging/logger";
import {StorageException} from "@/core/shared/exceptions";

export class FileStorageFirebase implements FileStorage {
  constructor(private readonly firebaseAdapter: FirebaseAdapter, private readonly logger: Logger) {
  }

  async save(file: FileToBeSaved, path: FilePath): Promise<FileDownloadUrl> {
    try {
      const fullPath = `${path.value()}${file.Name()}.${file.Extension()}`;
      const storageRef = ref(this.firebaseAdapter.storage, fullPath);
      await uploadBytes(storageRef, file.Content());
      const downloadURL = await getDownloadURL(storageRef);
      return FileDownloadUrl.create(downloadURL);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`Error saving file on: ${e.message}`);
      }
      throw new StorageException("Error saving file");
    }
  }

}
