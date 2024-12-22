import {InvalidParameterException} from "@/core/exceptions/exceptions";

export class Email {
    private constructor(private readonly email: string) {
    }

    static create(givenEmail: string): Email {
        if (!Email.isValid(givenEmail)) {
            throw new InvalidParameterException("Invalid email");
        }
        return new Email(givenEmail);
    }

    static isValid(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    value(): string {
        return this.email;
    }
}