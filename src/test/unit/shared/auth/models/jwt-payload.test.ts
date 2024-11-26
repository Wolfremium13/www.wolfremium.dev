import {describe, expect, it} from "vitest"
import {JwtPayload} from "@/core/shared/auth/models/jwt-payload";


describe("JwtPayload should", () => {
  it("be created", () => {
    const jwtPayload = JwtPayload.create("uuid", "user");

    expect(jwtPayload.uuid.value).toEqual("uuid");
    expect(jwtPayload.role.value).toEqual("user");
  });
})
