import {JwtRole, JwtAllowedRoles} from "@/core/shared/auth/domain/jwt-role";
import {JwtUuid} from "@/core/shared/auth/domain/jwt-uuid";

export class JwtPayload {
  private constructor(public readonly uuid: JwtUuid, public readonly role: JwtRole) {
  }
  static create(uuid: string, role: string): JwtPayload {
    return new JwtPayload(JwtUuid.create(uuid), JwtRole.create(role as JwtAllowedRoles));
  }
}
