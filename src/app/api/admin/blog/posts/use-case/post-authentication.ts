import {JwtToken} from "@/core/auth/models/jwt-token";

export interface PostAuthentication {
    authenticate(jwtToken: JwtToken): Promise<void>;
}