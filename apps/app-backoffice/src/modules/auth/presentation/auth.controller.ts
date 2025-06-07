import { Auth, AuthApplication } from "@auth/application";
import {
  ExceptionResponseErrorClient,
  ExceptionResponseErrorServer,
} from "@core/errors";
import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { Response } from "express";
import {
  AuthLoginDto,
  AuthOtpDto,
  AuthRefreshTokenDto,
  AuthResponseOtpDto,
  AuthResponseVerifyDto,
} from "./dtos";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthApplication)
    private readonly application: AuthApplication,
  ) {}

  @ApiOperation({
    summary: "Login with email and password",
    description: "Authenticate user with email and password",
  })
  @ApiResponse({
    status: 201,
    description: "User authenticated successfully",
    type: AuthResponseOtpDto,
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiResponse({
    status: "4XX",
    description: "Invalid credentials",
    type: ExceptionResponseErrorClient,
  })
  @Post("login")
  async login(@Body() body: AuthLoginDto) {
    try {
      const auth = new Auth(body);
      const result = await this.application.login(auth);
      if (!result)
        throw new HttpException(
          {
            name: "InvalidCredentials",
            message: "Invalid credentials",
            cause: "Invalida credentials",
            code: "401",
            stack: "Invalid credentials",
          },
          401,
        );

      return plainToInstance(AuthResponseOtpDto, result);
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          message: error.message,
          cause: error.cause,
          code: error.code,
          stack: error.stack,
        },
        error.status,
      );
    }
  }

  @Post("verify-otp")
  @ApiOperation({
    summary: "Verify OTP",
    description: "Verify the OTP sent to the user",
  })
  @ApiResponse({
    status: 201,
    description: "OTP verified successfully",
    type: AuthResponseVerifyDto,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiResponse({
    status: "4XX",
    description: "Invalid credentials",
    type: ExceptionResponseErrorClient,
  })
  async verifyOtp(@Body() body: AuthOtpDto) {
    try {
      const { uuid, token } = body;
      const result = await this.application.verifyOtp(uuid, token);
      if (!result)
        throw new HttpException(
          {
            name: "InvalidCredentials",
            message: "Invalid credentials",
            cause: "Invalida credentials",
            code: "401",
            stack: "Invalid credentials",
          },
          401,
        );

      return plainToInstance(AuthResponseVerifyDto, result);
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          message: error.message,
          cause: error.cause,
          code: error.code,
          stack: error.stack,
        },
        error.status,
      );
    }
  }

  @Post("logout")
  async logout(@Body() body: AuthRefreshTokenDto, @Res() res: Response) {
    const { refreshToken } = body;

    const result = await this.application.logout(refreshToken);
    if (!result)
      throw new HttpException(
        {
          name: "InvalidCredentials",
          message: "Invalid credentials",
          cause: "Invalida credentials",
          code: "401",
          stack: "Invalid credentials",
        },
        401,
      );

    return res.status(204).send();
  }

  @Post("refresh-token")
  async getNewAccessToken(@Body() body: AuthRefreshTokenDto) {
    const { refreshToken } = body;

    const result = await this.application.getNewAccessToken(refreshToken);
    if (!result)
      throw new HttpException(
        {
          name: "InvalidCredentials",
          message: "Invalid credentials",
          cause: "Invalida credentials",
          code: "401",
          stack: "Invalid credentials",
        },
        401,
      );

    return result;
  }
}
