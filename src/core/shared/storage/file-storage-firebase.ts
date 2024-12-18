import {FileStorage} from "@/core/shared/storage/file-storage";
import {Logger} from "@/core/shared/logging/logger";
import {StorageException} from "@/core/shared/exceptions";
import {FileDownloadUrl} from "@/core/shared/storage/models/file-download-url";
import {FileToBeSaved} from "@/core/shared/storage/models/file-to-be-saved";
import {FilePath} from "@/core/shared/storage/models/file-path";
import {FirebaseAdminAdapter} from "@/core/shared/firebase/firebase-admin-adapter";

export class FileStorageFirebase implements FileStorage {
    constructor(private readonly firebaseAdapter: FirebaseAdminAdapter, private readonly logger: Logger) {
    }

    async save(file: FileToBeSaved, path: FilePath): Promise<FileDownloadUrl> {
        try {
            const bucket = this.firebaseAdapter.bucket;
            const fileRef = bucket.file(`${path.value()}${file.Name()}.${file.Extension()}`);
            await fileRef.save(file.Content());
            const downloadURL = await fileRef.getSignedUrl({
                action: "read",
                expires: "03-09-2491"
            });
            this.logger.info(`File saved on: ${downloadURL[0]}`);
            return FileDownloadUrl.create(downloadURL[0]);
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(`Error saving file on: ${e.message}`);
            }
            throw new StorageException("Error saving file");
        }
    }
}
