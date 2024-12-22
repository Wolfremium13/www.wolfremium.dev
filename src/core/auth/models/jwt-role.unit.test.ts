import {describe, expect, it} from "vitest";
import {JwtRole} from "@/core/auth/models/jwt-role";

describe("JwtRole should", () => {
    it("be created", () => {
        const jwtRole = JwtRole.create("admin");

        expect(jwtRole.value).toEqual("admin");
    });
})
