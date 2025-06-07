import { AuthAdapter, authProviders } from "@auth/adapters";
import { AuthApplication } from "@auth/application";
import { DatabaseModule } from "@core/modules/database/database.module";
import { OtpModule } from "@core/modules/otp/otp.module";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";

@Module({
  imports: [DatabaseModule, OtpModule],
  controllers: [AuthController],
  providers: [AuthApplication, AuthAdapter, ...authProviders],
})
export class AuthModule {}
