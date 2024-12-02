import {JwtUuid} from "@/core/shared/auth/models/jwt-uuid";
import {JwtToken} from "@/core/shared/auth/models/jwt-token";
import {JwtRole} from "@/core/shared/auth/models/jwt-role";
import {JwtPayload} from "@/core/shared/auth/models/jwt-payload";


export interface Jwt {
  sign: (uuid: JwtUuid, role: JwtRole) => Promise<JwtToken>;
  verify: (token: JwtToken) => Promise<JwtPayload>;
}
