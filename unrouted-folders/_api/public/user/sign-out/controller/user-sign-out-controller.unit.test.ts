import {beforeEach, describe, expect, it} from "vitest"
import {mockDeep} from 'vitest-mock-extended';
import {UserSignOutController} from "@/app/api/public/user/sign-out/controller/user-sign-out-controller";
import {Logger} from "@/core/logging/logger";
import {UserSignOutUrl} from "@/app/api/public/user/sign-out/controller/user-sign-out-url";

describe('UserSignOutController', () => {
    let controller: UserSignOutController;
    let logger: Logger;

    beforeEach(() => {
        logger = mockDeep<Logger>();
        controller = new UserSignOutController(logger);
    });

    describe('post should', () => {
        it('clean up session cookies and redirect', async () => {
            const request = new Request(UserSignOutUrl.full, {
                method: 'POST',
            });
            request.headers.append('Cookie', 'api_auth=1234');
            request.headers.append('Cookie', 'auth=5678');

            const response = await controller.get(request);

            expect(response.status).toBe(302);
            expect(response.headers.get('Location')).toEqual('/');
            expect(response.headers.get('Set-Cookie')).toEqual(
                'api_auth=; HttpOnly; Path=/; Max-Age=0, auth=; HttpOnly; Path=/; Max-Age=0');
        });
    });

});