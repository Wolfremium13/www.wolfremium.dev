import {JwtToken} from "@/core/shared/auth/models/jwt-token";

export interface PostAuthentication {
    authenticate(jwtToken: JwtToken): Promise<void>;
}