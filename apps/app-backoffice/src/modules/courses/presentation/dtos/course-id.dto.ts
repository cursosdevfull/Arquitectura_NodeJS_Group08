import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class CourseIdDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  courseId: number;
}
