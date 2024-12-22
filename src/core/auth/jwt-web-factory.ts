import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {JwtFirebase} from "@/core/auth/engine/jwt-firebase";
import {FirebaseAdminAdapterFactory} from "@/core/firebase/firebase-admin-adapter-factory";
import {JwtEnvSecret} from "@/core/auth/config/jwt-env-secret";
import {JwtApi} from "@/core/auth/engine/jwt-api";

export class JwtWebFactory {
    static create() {
        const logger = ConsoleLoggerFactory.create();
        const jwtSecret = JwtEnvSecret.create();
        return new JwtApi(jwtSecret, logger);
    }
}
