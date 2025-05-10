import { CountryEnum, GenreEnum } from "@core/enum";
import { StudentProps } from "@students/application";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { SkillDto } from "./skill.dto";

export class StudentCreateDto
  implements Omit<StudentProps, "studentId" | "deletedAt">
{
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @IsEnum(CountryEnum)
  countryIso: CountryEnum;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(6)
  @IsEnum(GenreEnum)
  genre: GenreEnum;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  age: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: "At least one skill is required" })
  @ValidateNested()
  @Type(() => SkillDto)
  skills: SkillDto[];
}
