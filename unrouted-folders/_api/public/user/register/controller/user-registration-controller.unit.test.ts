import {beforeEach, describe, expect, it} from "vitest"
import {mock} from 'vitest-mock-extended';
import {UserRegistrationController} from "@/app/api/public/user/register/controller/user-registration-controller";
import {SanitizerFactory} from "@/core/security/sanitizer-factory";
import {Registration} from "@/app/api/public/user/register/use-case/registration";
import {UserRegisterUrl} from "@/app/api/public/user/register/controller/user-register-url";

describe("UserRegistrationController", () => {
    let userRegistrationController: UserRegistrationController;
    let registration: Registration;

    beforeEach(() => {
        registration = mock<Registration>();
        const sanitizer = SanitizerFactory.create();
        userRegistrationController = new UserRegistrationController(registration, sanitizer);
    });

    describe("post should", () => {
        it("handle 201", async () => {
            const request = new Request(UserRegisterUrl.full, {
                method: "POST",
                body: JSON.stringify({email: "myemail@email.com", password: "Password123@"})
            });

            const response = await userRegistrationController.post(request);

            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({message: "User created successfully"});
        });

        it("handle 400", async () => {
            const request = new Request(UserRegisterUrl.full, {
                method: "POST",
                body: JSON.stringify({email: "invalid-email", password: "invalid-password"})
            });

            const response = await userRegistrationController.post(request);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({error: "Invalid email"});
        });

        it("handle 500", async () => {
            console.log("UserRegisterUrl.full", UserRegisterUrl.full);
            const request = new Request(UserRegisterUrl.full, {
                method: "POST",
                body: JSON.stringify({email: "myemail@email.com", password: "Password123@"})
            });

            registration.registerWith = async () => {
                throw new Error("Unknown error");
            };

            const response = await userRegistrationController.post(request);

            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({error: "Unknown error while creating user"});
        });
    });
});
