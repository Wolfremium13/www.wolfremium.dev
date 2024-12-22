import {describe, expect, it} from "vitest"
import {JwtUuid} from "@/core/auth/models/jwt-uuid";

describe("JwtUuid should", () => {
    it("be created", () => {
        const jwtUuid = JwtUuid.create("jwt-uuid");

        expect(jwtUuid.value).toEqual("jwt-uuid");
    });

    it("throw exception when value is empty", () => {
        expect(() => JwtUuid.create("")).toThrow("JwtUuid is required");
    });
})
