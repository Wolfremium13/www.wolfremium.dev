import {JwtSecretKey} from "@/core/auth/models/jwt-secret-key";

export interface JwtSecret {
  get(): JwtSecretKey;
}
