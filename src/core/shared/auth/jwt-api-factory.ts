import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {JwtEnvSecret} from "@/core/shared/auth/config/jwt-env-secret";
import {FirebaseAdminAdapterFactory} from "@/core/shared/firebase/firebase-admin-adapter-factory";
import {JwtFirebase} from "@/core/shared/auth/engine/jwt-firebase";

export class JwtApiFactory {
    static create() {
        const logger = ConsoleLoggerFactory.create();
        const adapter = FirebaseAdminAdapterFactory.create();
        return new JwtFirebase(adapter, logger);
    }
}