import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { TeacherPropsUpdate } from "../../application/teacher";

export class TeacherUpdateDto implements TeacherPropsUpdate {
    @IsOptional()
    @IsString()
    @MinLength(3)
    names: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    lastname: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    phone: string

    @IsOptional()
    @IsString()
    @MinLength(3)
    address: string;
}