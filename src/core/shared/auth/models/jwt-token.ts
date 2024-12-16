import {InvalidParameterException, MissingParameterException} from "@/core/shared/exceptions";

export class JwtToken {
  private constructor(public readonly value: string) {
  }

  static create(value: string): JwtToken {
    if (!value) {
      throw new MissingParameterException('JwtToken is required');
    }
    if (!value.startsWith("ey")) {
      throw new InvalidParameterException("Invalid token");
    }

    return new JwtToken(value);
  }

  static fromAuthRequest(request: Request): JwtToken {
    const cookie = request.headers.get("Cookie");
    if (!cookie) {
      throw new MissingParameterException("Cookie is missing");
    }
    const token = cookie.split(";").find(c => c.startsWith("auth="));
    if (!token) {
      throw new MissingParameterException("Token is missing");
    }
    return JwtToken.create(token.replace("auth=", ""));
  }

  static fromApiAuthRequest(request: Request): JwtToken {
    const cookie = request.headers.get("Cookie");
    if (!cookie) {
      throw new MissingParameterException("Cookie is missing");
    }
    const token = cookie.split(";").find(c => c.startsWith("api_auth="));
    if (!token) {
      throw new MissingParameterException("Token is missing");
    }
    return JwtToken.create(token.replace("api_auth=", ""));
  }
}
