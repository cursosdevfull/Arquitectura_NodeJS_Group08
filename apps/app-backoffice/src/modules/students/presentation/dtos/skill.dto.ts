import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SkillDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  level: string;
}
