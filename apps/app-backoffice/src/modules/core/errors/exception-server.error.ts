import { ApiProperty } from "@nestjs/swagger";

export class ExceptionResponseErrorServer {
  @ApiProperty({
    type: "string",
    description: "Error name",
    example: "InvalidCredentials",
    required: true,
  })
  name: string;

  @ApiProperty({
    type: "string",
    description: "Error message",
    example: "Invalid credentials",
    required: true,
  })
  message: string;

  @ApiProperty({
    type: "string",
    description: "Error cause",
    example: "Invalid credentials",
    required: true,
  })
  cause: string;

  @ApiProperty({
    type: "string",
    description: "Error code",
    example: "5XX",
    required: true,
  })
  code: string;

  @ApiProperty({
    type: "string",
    description: "Error stack trace",
    example: "Error: Invalid credentials at ...",
    required: false,
  })
  stack: string;
}
