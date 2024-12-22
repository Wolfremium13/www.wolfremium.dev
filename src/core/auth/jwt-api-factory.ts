import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {JwtEnvSecret} from "@/core/auth/config/jwt-env-secret";
import {FirebaseAdminAdapterFactory} from "@/core/firebase/firebase-admin-adapter-factory";
import {JwtFirebase} from "@/core/auth/engine/jwt-firebase";

export class JwtApiFactory {
    static create() {
        const logger = ConsoleLoggerFactory.create();
        const adapter = FirebaseAdminAdapterFactory.create();
        return new JwtFirebase(adapter, logger);
    }
}