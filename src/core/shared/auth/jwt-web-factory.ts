import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {JwtFirebase} from "@/core/shared/auth/engine/jwt-firebase";
import {FirebaseAdminAdapterFactory} from "@/core/shared/firebase/firebase-admin-adapter-factory";
import {JwtEnvSecret} from "@/core/shared/auth/config/jwt-env-secret";
import {JwtApi} from "@/core/shared/auth/engine/jwt-api";

export class JwtWebFactory {
    static create() {
        const logger = ConsoleLoggerFactory.create();
        const jwtSecret = JwtEnvSecret.create();
        return new JwtApi(jwtSecret, logger);
    }
}
