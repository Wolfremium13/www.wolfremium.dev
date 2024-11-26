import {JwtRole} from "./jwt-role"

describe("JwtRole should", () => {
  it("be created", () => {
    const jwtRole = JwtRole.create("admin");

    expect(jwtRole.value).toEqual("admin");
  });
})
