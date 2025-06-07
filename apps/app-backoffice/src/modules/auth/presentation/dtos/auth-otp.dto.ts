import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class AuthOtpDto {
  @ApiProperty({
    type: "string",
    description: "User UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  uuid: string;

  @ApiProperty({
    type: "string",
    description: "OTP token",
    example: "123456",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  token: string;
}
