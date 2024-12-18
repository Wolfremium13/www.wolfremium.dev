import {InvalidParameterException, MissingParameterException} from "@/core/shared/exceptions";

export class PostShortDescription {
    private constructor(
        private readonly description: string
    ) {
    }

    static create(description: string): PostShortDescription {
        if (!description) {
            throw new MissingParameterException('Post description is required');
        }

        if (description.length < 10) {
            throw new InvalidParameterException('Post description is too short');
        }

        if (description.length > 600) {
            throw new InvalidParameterException('Post description is too long');
        }

        return new PostShortDescription(description + '...');
    }

    value(): string {
        return this.description;
    }
}