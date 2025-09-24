import {UserSignOutController} from "@/app/api/public/user/sign-out/controller/user-sign-out-controller";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";

export class UserSignOutControllerFactory {
    static create(): UserSignOutController {
        const logger = ConsoleLoggerFactory.create();
        return new UserSignOutController(logger);
    }
}