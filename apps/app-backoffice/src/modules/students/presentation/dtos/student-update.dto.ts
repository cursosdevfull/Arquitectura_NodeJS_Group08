import { CountryEnum, GenreEnum } from "@core/enum";
import { StudentPropsUpdate } from "@students/application";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { RoleDto } from "./role.dto";
import { SkillDto } from "./skill.dto";

export class StudentUpdateDto implements StudentPropsUpdate {
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  name: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  lastname: string;

  @IsOptional()
  @MaxLength(100)
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  phone: string;

  @IsOptional()
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

  @IsOptional()
  @Type(() => RoleDto)
  role: RoleDto;
}
