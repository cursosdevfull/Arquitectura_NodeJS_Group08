import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CourseIdDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    courseId: number;
}