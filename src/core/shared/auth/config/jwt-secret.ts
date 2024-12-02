import {JwtSecretKey} from "@/core/shared/auth/models/jwt-secret-key";

export interface JwtSecret {
  get(): JwtSecretKey;
}
