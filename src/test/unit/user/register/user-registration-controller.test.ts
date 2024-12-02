import {beforeEach, describe, expect, it} from "vitest"
import {mock} from 'vitest-mock-extended';
import {UserRegistrationController} from "@/core/user/register/controller/user-registration-controller";
import {UserRegistration} from "@/core/user/register/proxy/user-registration";
import {SanitizerFactory} from "@/core/shared/security/sanitizer-factory";

describe("UserRegistrationController", () => {
    let userRegistrationController: UserRegistrationController;
    let userRegistration: UserRegistration;

    beforeEach(() => {
        userRegistration = mock<UserRegistration>();
        const sanitizer = SanitizerFactory.create();
        userRegistrationController = new UserRegistrationController(userRegistration, sanitizer);
    });

    describe("post should", () => {
        it("handle 201", async () => {
            const request = new Request("http://localhost:8080/user/register", {
                method: "POST",
                body: JSON.stringify({email: "myemail@email.com", password: "Password123@"})
            });

            const response = await userRegistrationController.post(request);

            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({message: "User created successfully"});
        });

        it("handle 400", async () => {
            const request = new Request("http://localhost:8080/user/register", {
                method: "POST",
                body: JSON.stringify({email: "invalid-email", password: "invalid-password"})
            });

            const response = await userRegistrationController.post(request);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({error: "Invalid email"});
        });

        it("handle 500", async () => {
            const request = new Request("http://localhost:8080/user/register", {
                method: "POST",
                body: JSON.stringify({email: "myemail@email.com", password: "Password123@"})
            });

            userRegistration.register = async () => {
                throw new Error("Unknown error");
            };

            const response = await userRegistrationController.post(request);

            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({error: "Unknown error while creating user"});
        });
    });
});
