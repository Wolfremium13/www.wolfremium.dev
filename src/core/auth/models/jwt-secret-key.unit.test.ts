import {describe, expect, it} from "vitest"
import {JwtSecretKey} from "@/core/auth/models/jwt-secret-key";

describe("Jwt secret key should", () => {
  it("be created", () => {
    const secret = JwtSecretKey.create("secret")
    expect(secret.value).toBe("secret")
  })

  it("not allow empty", () => {
    expect(() => JwtSecretKey.create("")).toThrow("Invalid secret")
  })
})
