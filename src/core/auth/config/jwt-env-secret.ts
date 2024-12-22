import {MissingConfigurationException} from "@/core/exceptions/exceptions";
import {JwtSecret} from "@/core/auth/config/jwt-secret";
import {JwtSecretKey} from "@/core/auth/models/jwt-secret-key";

export class JwtEnvSecret implements JwtSecret {

  private constructor(private readonly secret: JwtSecretKey) {
  }

  static create(): JwtEnvSecret {
    const givenSecret = process.env.JWT_SECRET;
    if (!givenSecret) {
      throw new MissingConfigurationException("JWT_SECRET not found");
    }
    return new JwtEnvSecret(JwtSecretKey.create(givenSecret));
  }

  get(): JwtSecretKey {
    return this.secret;
  }
}
