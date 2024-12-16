import {PostAuthentication} from "@/core/blog/posts/use-case/post-authentication";
import {JwtApi} from "@/core/shared/auth/engine/jwt-api";
import {Logger} from "@/core/shared/logging/logger";
import {JwtToken} from "@/core/shared/auth/models/jwt-token";
import {AuthenticationException} from "@/core/shared/exceptions";

export class PostAuthenticationService implements PostAuthentication {
    constructor(private readonly jwtApi: JwtApi, private readonly logger: Logger) {
    }

    async authenticate(jwtToken: JwtToken): Promise<void> {
        const payload = await this.jwtApi.verify(jwtToken);
        if (payload.role.value !== "admin") {
            this.logger.error(`User with uuid: ${payload.uuid.value} and role: ${payload.role.value} tried to access post api`);
            throw new AuthenticationException("You are not allowed to access this resource");
        }
        this.logger.info(`User with uuid: ${payload.uuid.value} and role: ${payload.role.value} signed in on post api`);
    }
}