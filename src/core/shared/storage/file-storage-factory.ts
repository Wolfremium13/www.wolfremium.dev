import {FileStorage} from "@/core/shared/storage/file-storage";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";
import {FileStorageFirebase} from "@/core/shared/storage/file-storage-firebase";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {FirebaseAdminAdapterFactory} from "@/core/shared/firebase/firebase-admin-adapter-factory";

export class FileStorageFactory {
  static create(): FileStorage {
    const logger = ConsoleLoggerFactory.create()
    const adapter = FirebaseAdminAdapterFactory.create()
    return new FileStorageFirebase(adapter, logger)
  }
}
