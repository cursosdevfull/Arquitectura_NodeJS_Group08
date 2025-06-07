import { Payload } from "@core/types";
import { HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Role } from "@students/index";
import * as jwt from "jsonwebtoken";
import { GlobalService } from "./global.service";

export class TokensService {
  static generateAccessToken(
    name: string,
    lastname: string,
    role: Role,
    id: string,
  ): string {
    const globalService = GlobalService.instance;
    const configService = globalService.get(ConfigService);

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const payload: Payload = { id, name, lastname, actions: role.actions! };

    const secretKey = configService.get("ACCESS_TOKEN_SECRET");
    const expiresIn = configService.get("ACCESS_TOKEN_EXPIRATION_IN");

    return jwt.sign(payload, secretKey, { expiresIn });
  }

  static generateRefreshAccessToken(name: string, lastname: string): string {
    const globalService = GlobalService.instance;
    const configService = globalService.get(ConfigService);

    const payload = { name, lastname };

    const secretKey = configService.get("REFRESH_TOKEN_SECRET");
    const expiresIn = configService.get("REFRESH_TOKEN_EXPIRATION_IN");

    return jwt.sign(payload, secretKey, { expiresIn });
  }

  static validateToken(token: string) {
    try {
      const globalService = GlobalService.instance;
      const configService = globalService.get(ConfigService);
      const payload: Payload = jwt.verify(
        token,
        configService.get("ACCESS_TOKEN_SECRET"),
      );

      return {
        isValid: true,
        statusCode: HttpStatus.OK,
        payload,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          isValid: false,
          statusCode: HttpStatus.FORBIDDEN,
          error: "TokenExpiredError",
          message: "Token expired",
        };
      }
      return {
        isValid: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        error: "TokenInvalidError",
        message: "Token invalid",
      };
    }
  }
}
