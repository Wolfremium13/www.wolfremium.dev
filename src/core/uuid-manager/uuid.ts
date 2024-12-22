import {MissingParameterException} from "@/core/exceptions/exceptions";

export class Uuid {
    private constructor(private readonly givenUuid: string) {
    }

    static create(givenUuid: string): Uuid {
        if (!givenUuid) {
            throw new MissingParameterException("Uuid must be provided");
        }
        return new Uuid(givenUuid);
    }

    value(): string {
        return this.givenUuid;
    }
}