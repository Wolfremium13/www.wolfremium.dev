import {XssSanitizer} from "@/core/shared/security/xss-sanitizer";

export class SanitizerFactory {
    static create() {
        return new XssSanitizer();
    }
}