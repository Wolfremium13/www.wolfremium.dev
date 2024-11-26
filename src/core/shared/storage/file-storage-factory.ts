import {FileStorage} from "@/core/shared/storage/file-storage";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";
import {FileStorageFirebase} from "@/core/shared/storage/file-storage-firebase";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";

export class FileStorageFactory {
  static create(): FileStorage {
    const logger = ConsoleLoggerFactory.create()
    const adapter = FirebaseAdapterFactory.create()
    return new FileStorageFirebase(adapter, logger)
  }
}
