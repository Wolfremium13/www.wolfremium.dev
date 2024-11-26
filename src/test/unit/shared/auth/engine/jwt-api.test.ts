import {beforeEach, describe, expect, it} from "vitest"
import {mockDeep} from 'vitest-mock-extended';
import {JwtSecret} from "@/core/shared/auth/config/jwt-secret";
import {Logger} from "@/core/shared/logging/logger";
import {JwtApi} from "@/core/shared/auth/engine/jwt-api";
import {JwtSecretKey} from "@/core/shared/auth/models/jwt-secret-key";
import {JwtUuid} from "@/core/shared/auth/models/jwt-uuid";
import {JwtRole} from "@/core/shared/auth/models/jwt-role";
import {JwtToken} from "@/core/shared/auth/models/jwt-token";

describe("Jwt Api should ", () => {
  let jwtSecret: JwtSecret
  const logger = mockDeep<Logger>()
  beforeEach(() => {
    jwtSecret = mockDeep<JwtSecret>(
      {
        get: () => JwtSecretKey.create("secret")
      }
    )
  })
  it("sign a token", async () => {
    const jwtApiSigner = new JwtApi(jwtSecret, logger)
    const uuid = JwtUuid.create("uuid");
    const role = JwtRole.create("user");

    const token = await jwtApiSigner.sign(uuid, role)

    expect(token).toBeDefined()
    expect(token.value).toBeDefined()
  })

  it("verify a token", async () => {
    const jwtApiSigner = new JwtApi(jwtSecret, logger)
    const signedToken = await jwtApiSigner.sign(JwtUuid.create("uuid"), JwtRole.create("user"))
    const token = JwtToken.create(signedToken.value);

    const payload = await jwtApiSigner.verify(token)

    expect(payload).toBeDefined()
    expect(payload.uuid).toBeDefined()
    expect(payload.role).toBeDefined()
  })

  it("not allow bad formatted token", async () => {
    const jwtApiSigner = new JwtApi(jwtSecret, logger)
    const token = JwtToken.create("ey-invalid-token");

    await expect(jwtApiSigner.verify(token)).rejects.toThrow()
  })
})
