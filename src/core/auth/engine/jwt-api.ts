import {jwtVerify, SignJWT} from "jose";
import {AuthenticationException} from "@/core/exceptions/exceptions";
import {Logger} from "@/core/logging/logger";
import {Jwt} from "@/core/auth/engine/jwt";
import {JwtSecret} from "@/core/auth/config/jwt-secret";
import {JwtUuid} from "@/core/auth/models/jwt-uuid";
import {JwtRole} from "@/core/auth/models/jwt-role";
import {JwtToken} from "@/core/auth/models/jwt-token";
import {JwtPayload} from "@/core/auth/models/jwt-payload";

export class JwtApi implements Jwt {
  constructor(private readonly secret: JwtSecret, private readonly logger: Logger) {
  }

  async sign(uuid: JwtUuid, role: JwtRole): Promise<JwtToken> {
    const secret = new TextEncoder().encode(this.secret.get().value);
    const rawToken = await new SignJWT({uuid: uuid.value, role: role.value})
      .setProtectedHeader({alg: "HS256"})
      .setExpirationTime("24h")
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
