import DOMPurify from 'isomorphic-dompurify';

export class XssSanitizer implements Sanitizer {
    sanitize(givenValue: string): string {
        return DOMPurify.sanitize(givenValue);
    }
}