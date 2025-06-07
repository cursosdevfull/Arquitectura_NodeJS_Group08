import { CourseProps } from "@courses/application/root";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CourseCreateDto
  implements
    Omit<CourseProps, "courseId" | "deletedAt" | "createdAt" | "updatedAt">
{
  @ApiProperty({
    description: "The name of the course",
    example: "Introduction to Programming",
    minLength: 3,
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  name: string;
}
