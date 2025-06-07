import { TokensService } from "@core/services";
import { CanActivate, ExecutionContext, HttpException } from "@nestjs/common";

export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];

    if (!token)
      throw new HttpException(
        {
          name: "InvalidToken",
          message: "Invalid token",
          cause: "Invalid token",
          code: "401",
          stack: "Invalid token",
        },
        401,
      );

    const resultValidation = TokensService.validateToken(token);
    if (!resultValidation.isValid) {
      throw new HttpException(
        {
          name: resultValidation.error,
          message: resultValidation.message,
          cause: resultValidation.error,
          code: resultValidation.statusCode,
          stack: resultValidation.message,
        },
        resultValidation.statusCode,
      );
    }

    request.user = {
      id: resultValidation.payload?.id,
      actions: resultValidation.payload?.actions,
    };

    return true;
  }
}
