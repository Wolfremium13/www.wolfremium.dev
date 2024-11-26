import {InvalidParameterException, MissingParameterException} from "@/core/shared/exceptions";

export class JwtToken {
  private constructor(public readonly value: string) {
  }

  static create(value: string): JwtToken {
    if (!value) {
      throw new MissingParameterException('JwtToken is required');
    }
    if (!value.startsWith("ey")) {
      throw new InvalidParameterException("Invalid token");
    }

    return new JwtToken(value);
  }
}
