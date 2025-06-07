import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class RoleDto {
  @ApiProperty({
    type: "number",
    description: "Unique identifier for the role",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  roleId: number;
}
