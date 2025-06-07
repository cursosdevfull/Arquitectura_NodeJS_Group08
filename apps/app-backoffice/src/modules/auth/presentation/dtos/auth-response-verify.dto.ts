import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseVerifyDto {
  @ApiProperty({
    type: "string",
    description: "Access token for authenticated user",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    type: "string",
    description: "Refresh token for authenticated user",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    required: true,
  })
  refreshToken: string;
}
