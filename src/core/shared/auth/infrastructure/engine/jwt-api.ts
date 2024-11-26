import {JwtSecret} from "@/core/shared/auth/infrastructure/config/jwt-secret";
import {JwtToken} from "@/core/shared/auth/domain/jwt-token";
import {JwtUuid} from "@/core/shared/auth/domain/jwt-uuid";
import {jwtVerify, SignJWT} from "jose";
import {JwtRole} from "@/core/shared/auth/domain/jwt-role";
import {JwtPayload} from "@/core/shared/auth/domain/jwt-payload";
import {AuthenticationException} from "@/core/shared/exceptions";
import {Logger} from "@/core/shared/logging/logger";
import {Jwt} from "@/core/shared/auth/infrastructure/engine/jwt";

export class JwtApi implements Jwt {
  constructor(private readonly secret: JwtSecret, private readonly logger: Logger) {
  }

  async sign(uuid: JwtUuid, role: JwtRole): Promise<JwtToken> {
    const secret = new TextEncoder().encode(this.secret.get().value);
    const rawToken = await new SignJWT({uuid: uuid.value, role: role.value})
      .setProtectedHeader({alg: "HS256"})
      .setExpirationTime("1h")
      .sign(secret);
    return JwtToken.create(rawToken);
  }

  async verify(token: JwtToken): Promise<JwtPayload> {
    try {
      const secretKey = new TextEncoder().encode(this.secret.get().value);
      const {payload} = await jwtVerify(token.value, secretKey);
      return JwtPayload.create(payload.uuid as string, payload.role as string);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(e.message);
      }
      throw new AuthenticationException("Invalid token");
    }
  }
}
