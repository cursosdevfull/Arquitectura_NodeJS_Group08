import { Module } from "@nestjs/common";
import { otpProviders } from "./otp.provider";

@Module({
  providers: [...otpProviders],
  exports: [...otpProviders],
})
export class OtpModule {}
