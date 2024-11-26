import {JwtSecretKey} from "@/core/shared/auth/domain/jwt-secret-key";

export interface JwtSecret {
  get(): JwtSecretKey;
}
