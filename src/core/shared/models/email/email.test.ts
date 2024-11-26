import {Email} from "@/core/shared/models/email/email";

describe('Email should', () => {
    it('be created', () => {
        const email = Email.create("wolfremiuminformatica@gmail.com");

        expect(email.Value()).toBe("wolfremiuminformatica@gmail.com");
    });

    it('not allow invalid email', () => {
        expect(() => Email.create("invalid-email")).toThrowError("Invalid email");
    });
});