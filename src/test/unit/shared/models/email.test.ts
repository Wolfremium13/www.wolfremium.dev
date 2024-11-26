import {describe, expect, it} from "vitest"
import {Email} from "@/core/shared/models/email";

describe('Email should', () => {
    it('be created', () => {
        const email = Email.create("wolfremiuminformatica@gmail.com");

        expect(email.value()).toBe("wolfremiuminformatica@gmail.com");
    });

    it('not allow invalid email', () => {
        expect(() => Email.create("invalid-email")).toThrowError("Invalid email");
    });
});