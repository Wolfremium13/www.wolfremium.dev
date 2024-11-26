import {beforeEach, describe, expect, it} from "vitest"
import {mockDeep} from 'vitest-mock-extended';
import {PasswordResetter} from "@/core/user/forgot-password/proxies/password-resetter";
import {ForgotPasswordService} from "@/core/user/forgot-password/use-case/forgot-password-service";
import {Email} from "@/core/shared/models/email";
import {ForgotPassword} from "@/core/user/forgot-password/use-case/forgot-password";

describe('ForgotPasswordService should', () => {
    let passwordResetter: PasswordResetter;
    let forgotPasswordService: ForgotPassword;
    beforeEach(() => {
        passwordResetter = mockDeep<PasswordResetter>();
        forgotPasswordService = new ForgotPasswordService(passwordResetter);
    });

    it('reset password', async () => {
        const validEmail = Email.create('myemail@example.com');
        await forgotPasswordService.resetPassword(validEmail);
        expect(passwordResetter.reset).toHaveBeenCalledWith(validEmail);
    });
});