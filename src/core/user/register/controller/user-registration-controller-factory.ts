import {UserRegistrationController} from "@/core/user/register/controller/user-registration-controller";
import {RegistrationService} from "@/core/user/register/use-case/registration-service";
import {SanitizerFactory} from "@/core/shared/security/sanitizer-factory";
import {FirebaseUserRegistration} from "@/core/user/register/proxy/firebase-user-registration";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";

export class UserRegistrationControllerFactory {
    static create() {
        const sanitizer = SanitizerFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const adapter = FirebaseAdapterFactory.create();
        const userRegistration = new FirebaseUserRegistration(adapter, logger);
        const registrationService = new RegistrationService(userRegistration);
        return new UserRegistrationController(registrationService, sanitizer);
    }
}