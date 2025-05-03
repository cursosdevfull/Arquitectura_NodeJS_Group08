import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class TeacherIdDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number
}