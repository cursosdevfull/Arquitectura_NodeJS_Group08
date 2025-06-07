import { CoursePropsUpdate } from "@courses/application/root";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CourseUpdateDto implements CoursePropsUpdate {
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  name?: string;
}
