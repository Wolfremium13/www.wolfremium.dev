import {JwtEnvSecret} from "@/core/shared/auth/config/jwt-env-secret";
import {JwtApi} from "@/core/shared/auth/engine/jwt-api";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";

export class JwtFactory {
  static create() {
    const logger = ConsoleLoggerFactory.create();
    const jwtSecret = JwtEnvSecret.create();
    return new JwtApi(jwtSecret, logger);
  }
}
