import {describe, expect, it} from "vitest";
import {Uuid} from "@/core/shared/models/uuid";

describe("Uuid should", () => {
    it("allow valid uuid", () => {
        const validUuid = "123e4567-e89b-12d3-a456-426614174000";
        expect(Uuid.create(validUuid).value() === validUuid).toBeTruthy();
    });

    it("not allow empty", () => {
        expect(() => Uuid.create("")).toThrowError("Uuid must be provided");
    });
});
