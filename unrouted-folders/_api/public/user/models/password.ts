import {InvalidParameterException, MissingParameterException} from "@/core/exceptions/exceptions";

export class Password {
    private constructor(private readonly givenPassword: string) {
    }

    static create(givenPassword: string): Password {
        if (!givenPassword) {
            throw new MissingParameterException("Password must be provided");
        }

        if (givenPassword.length < 6) {
            throw new InvalidParameterException("Password must be at least 6 characters long");
        }

        if (givenPassword.length > 50) {
            throw new InvalidParameterException("Password must be at most 50 characters long");
        }

        if (!Password.isStrongEnough(givenPassword)) {
            throw new InvalidParameterException("Password must contain at least one letter and one number");
        }

        return new Password(givenPassword);
    }

    value(): string {
        return this.givenPassword;
    }

    static isStrongEnough(value: string): boolean {
        return /[a-zA-Z]/.test(value) && /\d/.test(value);
    }
}