import { IsNotEmpty, IsString } from "class-validator";

export class TeacherCreateDto {
    @IsNotEmpty()
    @IsString({message: "Names teacher must be a string"})
    names: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}