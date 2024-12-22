import {XssSanitizer} from "@/core/security/xss-sanitizer";

export class SanitizerFactory {
    static create() {
        return new XssSanitizer();
    }
}