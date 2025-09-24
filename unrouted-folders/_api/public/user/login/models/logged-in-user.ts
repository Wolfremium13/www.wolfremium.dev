import {Email} from "@/app/api/public/user/models/email";
import {Uuid} from "@/core/uuid-manager/uuid";

export class LoggedInUser {
    private constructor(
        private readonly givenUuid: Uuid,
        private readonly givenEmail: Email,
        private readonly givenRole: string
    ) {
    }

    static create(uuid: Uuid, email: Email, role: string): LoggedInUser {
        return new LoggedInUser(uuid, email, role);
    }

    uuid(): string {
        return this.givenUuid.value();
    }

    email(): string {
        return this.givenEmail.value();
    }

    role(): string {
        return this.givenRole;
    }
}