import {beforeEach, describe, expect, it} from "vitest"
import {mock} from 'vitest-mock-extended';
import {UserAuthentication} from "@/core/user/login/proxy/user-authentication";
import {AuthenticationService} from "@/core/user/login/use-case/authentication-service";
import {Authentication} from "@/core/user/login/use-case/authentication";
import {Email} from "@/core/shared/models/email";
import {Password} from "@/core/shared/models/password";

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