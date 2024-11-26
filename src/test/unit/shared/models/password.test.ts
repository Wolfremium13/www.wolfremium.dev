import {describe, expect, it} from "vitest";
import {Password} from "@/core/shared/models/password";

describe("Password should", () => {
    it("allow valid password", () => {
        const strongPassword = "123456a";
        expect(Password.create(strongPassword).value() === strongPassword).toBeTruthy();
    });

    it("not allow empty", () => {
        expect(() => Password.create("")).toThrowError("Password must be provided");
    });

    it("not allow less than 6 characters", () => {
        expect(() => Password.create("12345")).toThrowError("Password must be at least 6 characters long");
    });

    it("not allow more than 50 characters", () => {
        expect(() => Password.create("1".repeat(51))).toThrowError("Password must be at most 50 characters long");
    });

    it("not allow weak password", () => {
        expect(() => Password.create("123456")).toThrowError("Password must contain at least one letter and one number");
    });
});