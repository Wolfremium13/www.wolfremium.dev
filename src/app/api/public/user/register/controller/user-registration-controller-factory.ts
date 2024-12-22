import {UserRegistrationController} from "@/app/api/public/user/register/controller/user-registration-controller";
import {RegistrationService} from "@/app/api/public/user/register/use-case/registration-service";
import {SanitizerFactory} from "@/core/security/sanitizer-factory";
import {FirebaseUserRegistration} from "@/app/api/public/user/register/proxy/firebase-user-registration";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {FirebaseAdapterFactory} from "@/core/firebase/firebase-adapter-factory";

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