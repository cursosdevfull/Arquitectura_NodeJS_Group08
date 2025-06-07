import { AuthAdapter } from "@auth/adapters";
import { AuthPort } from "@auth/ports";
import { OtpService } from "@core/modules/otp/otp.service";
import { CypherService, TokensService } from "@core/services";
import { Otp } from "@core/types/otp.type";
import { Inject } from "@nestjs/common";
import { Tokens } from "../../core/types/tokens.type";
import { Auth } from "./auth";

export class AuthApplication {
  constructor(
    @Inject(AuthAdapter) protected readonly port: AuthPort,
    private readonly otpService: OtpService,
  ) {}

  async login(auth: Auth): Promise<Otp | null> {
    const { password } = auth.properties;

    const student = await this.port.findByEmail(auth);
    if (!student) return null;

    const isPasswordValid = await CypherService.verify(
      password,
      student.properties.password,
    );
    if (!isPasswordValid) return null;

    const { enabled2Fa, uuid, qrCode } = student.properties;

    if (enabled2Fa) {
      return { uuid: uuid as string, enabled2Fa };
    }

    return {
      uuid: uuid as string,
      enabled2Fa: enabled2Fa as boolean,
      qr: qrCode,
    };

    /*          */
  }

  async logout(refreshToken: string): Promise<string | null> {
    const token = await this.port.logout(refreshToken);
    if (!token) return null;

    return token;
  }

  async verifyOtp(uuid: string, token: string): Promise<Tokens | null> {
    const student = await this.port.findByUuid(uuid);
    if (!student) return null;

    const { secret } = student.properties;

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const isValid = this.otpService.verifyOtp(secret!, token);
    if (!isValid) return null;

    const { name, lastname, role, uuid: id } = student.properties;
    const refreshToken = TokensService.generateRefreshAccessToken(
      name,
      lastname,
    );
    const accessToken = TokensService.generateAccessToken(
      name,
      lastname,
      role,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      id!,
    );

    student.updateRefreshToken(refreshToken);
    student.updateEnabled2Fa();
    await this.port.save(student);

    return { accessToken, refreshToken };
  }

  async getNewAccessToken(refreshToken: string): Promise<Tokens | null> {
    const student = await this.port.findByRefreshToken(refreshToken);
    if (!student) return null;

    const { name, lastname, role, uuid: id } = student.properties;
    const newRefreshToken = TokensService.generateRefreshAccessToken(
      name,
      lastname,
    );
    const newAccessToken = TokensService.generateAccessToken(
      name,
      lastname,
      role,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      id!,
    );

    student.updateRefreshToken(newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
