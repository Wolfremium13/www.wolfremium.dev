import {InvalidParameterException, MissingParameterException} from "@/core/shared/exceptions";

export type JwtAllowedRoles = 'admin' | 'user';
export class JwtRole {
  private static allowedRoles: string[ ] = ['admin', 'user'];

  private constructor(public readonly value: string) {
  }

  static create(givenRole: JwtAllowedRoles): JwtRole {
    if (!givenRole) {
      throw new MissingParameterException('JwtRole is required');
    }
    if (!this.allowedRoles.includes(givenRole)) {
      throw new InvalidParameterException('Role is not allowed');
    }
    return new JwtRole(givenRole);
  }
}
