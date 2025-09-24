import {beforeEach, describe, expect, it} from "vitest"
import {mockDeep} from 'vitest-mock-extended';
import {UserLoginController} from "@/app/api/public/user/login/controller/user-login-controller";
import {Authentication} from "@/app/api/public/user/login/use-case/authentication";
import {JwtApi} from "@/core/auth/engine/jwt-api";
import {SanitizerFactory} from "@/core/security/sanitizer-factory";
import {JwtToken} from "@/core/auth/models/jwt-token";
import {LoggedInUser} from "@/app/api/public/user/login/models/logged-in-user";
import {Uuid} from "@/core/uuid-manager/uuid";
import {Email} from "@/app/api/public/user/models/email";
import {AuthenticationException} from "@/core/exceptions/exceptions";
import {JwtFirebase} from "@/core/auth/engine/jwt-firebase";
import {UserLoginUrl} from "@/app/api/public/user/login/controller/user-login-url";

describe('UserLoginController', () => {
    let controller: UserLoginController;
    let authentication: Authentication;
    let jwtApi: JwtApi;
    let jwtFirebase: JwtFirebase;

    beforeEach(() => {
        authentication = mockDeep<Authentication>({
            loginWith: async () => {
                const uuid = Uuid.create('uuid');
                const validEmail = Email.create('myemail@email.com');
                const role = 'user';
                return LoggedInUser.create(uuid, validEmail, role);
            }
        });
        jwtApi = mockDeep<JwtApi>({
            sign: async () => {
                return JwtToken.create('eyToken');
            }
        });
        jwtFirebase = mockDeep<JwtFirebase>({
            sign: async () => {
                return JwtToken.create('eyToken');
            }
        });
        controller = new UserLoginController(
            authentication,
            SanitizerFactory.create(),
            jwtApi,
            jwtFirebase);
    });

    describe('post should', () => {
        it('handle 200', async () => {
            const givenEmail = 'myemail@email.com';
            const givenPassword = 'passWord12';
            const request = new Request(UserLoginUrl.full, {
                method: 'POST',
                body: JSON.stringify({email: givenEmail, password: givenPassword})
            });

            const response = await controller.post(request);

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({uid: 'uuid', email: givenEmail});
            expect(response.headers.get('Set-Cookie')).toEqual(
                `auth=eyToken; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400, ` +
                `api_auth=eyToken; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400`
            );
        });

        it('handle 400', async () => {
            const request = new Request(UserLoginUrl.full, {
                method: 'POST',
                body: JSON.stringify({email: 'invalid-email', password: 'invalid-password'})
            });

            const response = await controller.post(request);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({error: 'Invalid email'});
        });

        it('handle 401', async () => {
            const givenEmail = 'myemail@email.com';
            const givenPassword = 'passWord12';
            authentication.loginWith = async () => {
                throw new AuthenticationException('Invalid credentials');
            };
            const request = new Request(UserLoginUrl.full, {
                method: 'POST',
                body: JSON.stringify({email: givenEmail, password: givenPassword})
            });

            const response = await controller.post(request);

            expect(response.status).toBe(401);
            expect(await response.json()).toEqual({error: 'Invalid credentials'});
        });

        it('handle 500', async () => {
            const givenEmail = 'myemail@email.com';
            const givenPassword = 'passWord12';
            authentication.loginWith = async () => {
                throw new Error('Unknown error');
            };
            const request = new Request(UserLoginUrl.full, {
                method: 'POST',
                body: JSON.stringify({email: givenEmail, password: givenPassword})
            });

            const response = await controller.post(request);

            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({error: 'Unknown error'});
        });
    });
});