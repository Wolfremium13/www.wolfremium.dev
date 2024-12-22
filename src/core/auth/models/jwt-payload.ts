import {JwtUuid} from "@/core/auth/models/jwt-uuid";
import {JwtAllowedRoles, JwtRole} from "@/core/auth/models/jwt-role";

export class JwtPayload {
  private constructor(public readonly uuid: JwtUuid, public readonly role: JwtRole) {
  }
  static create(uuid: string, role: string): JwtPayload {
    return new JwtPayload(JwtUuid.create(uuid), JwtRole.create(role as JwtAllowedRoles));
  }
  isAdministrator(): boolean {
    return this.role.value === "admin";
  }
}
