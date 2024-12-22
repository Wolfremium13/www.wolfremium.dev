import {JwtUuid} from "@/core/auth/models/jwt-uuid";
import {JwtToken} from "@/core/auth/models/jwt-token";
import {JwtRole} from "@/core/auth/models/jwt-role";
import {JwtPayload} from "@/core/auth/models/jwt-payload";


export interface Jwt {
  sign: (uuid: JwtUuid, role: JwtRole) => Promise<JwtToken>;
  verify: (token: JwtToken) => Promise<JwtPayload>;
}
