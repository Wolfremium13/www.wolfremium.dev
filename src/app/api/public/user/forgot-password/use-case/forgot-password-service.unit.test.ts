import {beforeEach, describe, expect, it} from "vitest"
import {mockDeep} from 'vitest-mock-extended';
import {ForgotPasswordService} from "@/app/api/public/user/forgot-password/use-case/forgot-password-service";
import {Email} from "@/app/api/public/user/models/email";
import {ForgotPassword} from "@/app/api/public/user/forgot-password/use-case/forgot-password";
import {PasswordResetter} from "@/app/api/public/user/forgot-password/proxy/password-resetter";

describe('ForgotPasswordService should', () => {
    let passwordResetter: PasswordResetter;
    let forgotPasswordService: ForgotPassword;
    beforeEach(() => {
        passwordResetter = mockDeep<PasswordResetter>();
        forgotPasswordService = new ForgotPasswordService(passwordResetter);
    });

    it('reset password', async () => {
        const validEmail = Email.create('myemail@example.com');
        await forgotPasswordService.reset(validEmail);
        expect(passwordResetter.reset).toHaveBeenCalledWith(validEmail);
    });
});