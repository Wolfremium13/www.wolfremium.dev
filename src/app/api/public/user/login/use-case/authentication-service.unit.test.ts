import {beforeEach, describe, expect, it} from "vitest"
import {mock} from 'vitest-mock-extended';
import {UserAuthentication} from "@/app/api/public/user/login/proxy/user-authentication";
import {AuthenticationService} from "@/app/api/public/user/login/use-case/authentication-service";
import {Authentication} from "@/app/api/public/user/login/use-case/authentication";
import {Email} from "@/app/api/public/user/models/email";
import {Password} from "@/app/api/public/user/models/password";

describe('AuthenticationService should', () => {
    let authentication: UserAuthentication;
    let authenticationService: Authentication;
    beforeEach(() => {
        authentication = mock<UserAuthentication>();
        authenticationService = new AuthenticationService(authentication);
    });

    it('login with email and password', async () => {
        const validEmail = Email.create('myemail@email.com');
        const validPassword = Password.create('Password123@');
        await authenticationService.loginWith(validEmail, validPassword);

        expect(authentication.login).toHaveBeenCalledWith(validEmail, validPassword);
    });
});