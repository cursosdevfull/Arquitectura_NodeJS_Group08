import * as speakeasy from "speakeasy";

export class OtpService {
  generateOtp(): speakeasy.GeneratedSecret {
    return speakeasy.generateSecret({
      name: "Course NodeJS Group21",
    });
  }

  verifyOtp(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
  }
}
