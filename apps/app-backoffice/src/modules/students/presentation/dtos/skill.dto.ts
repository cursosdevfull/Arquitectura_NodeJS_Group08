import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SkillDto {
  @ApiProperty({
    type: "string",
    description: "Unique identifier for the skill",
    example: "skill-123",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  description: string;

  @ApiProperty({
    type: "string",
    description: "Level of the skill",
    example: "beginner",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  level: string;
}
