import {JwtUuid} from "@/core/shared/auth/domain/jwt-uuid";
import {JwtToken} from "@/core/shared/auth/domain/jwt-token";
import {JwtRole} from "@/core/shared/auth/domain/jwt-role";
import {JwtPayload} from "@/core/shared/auth/domain/jwt-payload";

export interface Jwt {
  sign: (uuid: JwtUuid, role: JwtRole) => Promise<JwtToken>;
  verify: (token: JwtToken) => Promise<JwtPayload>;
}
