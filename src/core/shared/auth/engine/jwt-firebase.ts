import {Jwt} from "@/core/shared/auth/engine/jwt";
import {JwtPayload} from "../models/jwt-payload";
import {JwtRole} from "../models/jwt-role";
import {JwtToken} from "../models/jwt-token";
import {JwtUuid} from "../models/jwt-uuid";
import {FirebaseAdminAdapter} from "@/core/shared/firebase/firebase-admin-adapter";
import {Logger} from "@/core/shared/logging/logger";
import {ServerSideException} from "@/core/shared/exceptions";

export class JwtFirebase implements Jwt {
    constructor(
        private readonly adminAdapter: FirebaseAdminAdapter,
        private readonly logger: Logger
    ) {
    }

    async sign(uuid: JwtUuid, role: JwtRole): Promise<JwtToken> {
        try {
            const auth = this.adminAdapter.auth;
            const customToken = await auth.createCustomToken(uuid.value, {role: role.value});
            this.logger.info(`Custom token created for ${uuid.value}`);
            return JwtToken.create(customToken);
        } catch (error) {
            if (error instanceof Error) {
                this.logger.error(`Error creating custom token for ${uuid.value}: ${error.message}`);
            }
            throw new ServerSideException('Error creating custom token');
        }
    }

    async verify(token: JwtToken): Promise<JwtPayload> {
        try {
            const auth = this.adminAdapter.auth;
            const decodedToken = await auth.verifyIdToken(token.value);
            this.logger.info(`Token verified for ${decodedToken.uid}`);
            return JwtPayload.create(decodedToken.uid, decodedToken.role);
        } catch (error) {
            if (error instanceof Error) {
                this.logger.error(`Error verifying token: ${error.message}`);
            }
            throw new ServerSideException('Error verifying token for user');
        }
    }

}