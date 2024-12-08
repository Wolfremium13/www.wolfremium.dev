import {InvalidParameterException} from "@/core/shared/exceptions";

export class PostLang {
    private constructor(private readonly lang: string) {
    }

    static create(lang: string): PostLang {
        const allowedLanguages = ['en', 'es'];
        if (!allowedLanguages.includes(lang)) {
            throw new InvalidParameterException(`Invalid lang: ${lang}`);
        }
        return new PostLang(lang);
    }

    value(): string {
        return this.lang;
    }
}