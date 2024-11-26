import {JwtSecret} from "@/core/shared/auth/infrastructure/config/jwt-secret";
import {JwtSecretKey} from "@/core/shared/auth/domain/jwt-secret-key";
import {JwtUuid} from "@/core/shared/auth/domain/jwt-uuid";
import {JwtRole} from "@/core/shared/auth/domain/jwt-role";
import {JwtToken} from "@/core/shared/auth/domain/jwt-token";
import {Logger} from "@/core/shared/logging/logger";
import {JwtApi} from "@/core/shared/auth/infrastructure/engine/jwt-api";
import { mockDeep } from 'jest-mock-extended';

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
