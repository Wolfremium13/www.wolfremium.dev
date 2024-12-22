import {FileStorage} from "@/core/storage/file-storage";
import {FirebaseAdapterFactory} from "@/core/firebase/firebase-adapter-factory";
import {FileStorageFirebase} from "@/core/storage/file-storage-firebase";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {FirebaseAdminAdapterFactory} from "@/core/firebase/firebase-admin-adapter-factory";

export class FileStorageFactory {
  static create(): FileStorage {
    const logger = ConsoleLoggerFactory.create()
    const adapter = FirebaseAdminAdapterFactory.create()
    return new FileStorageFirebase(adapter, logger)
  }
}
