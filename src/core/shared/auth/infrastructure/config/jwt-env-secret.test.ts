import {JwtEnvSecret} from "@/core/shared/auth/infrastructure/config/jwt-env-secret";


describe("JwtEnvSecret should", () => {
  it("use the secret", () => {
    process.env.JWT_SECRET = "secret"
    const secret = JwtEnvSecret.create().get()
    expect(secret.value).toBe("secret")
  })

  it("not allow empty", () => {
    process.env.JWT_SECRET = ""
    expect(() => JwtEnvSecret.create().get()).toThrow("JWT_SECRET not found")
  })
})
