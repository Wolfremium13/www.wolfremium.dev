import {MissingParameterException} from "@/core/exceptions/exceptions";

export class JwtUuid {
  private constructor(public readonly value: string) {
  }

  static create(value: string): JwtUuid {
    if (!value) {
      throw new MissingParameterException('JwtUuid is required');
    }
    return new JwtUuid(value);
  }
}
