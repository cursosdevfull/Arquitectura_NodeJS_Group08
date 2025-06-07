import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CourseResponseDto {
  @Expose()
  @ApiProperty({
    type: "number",
    description: "Unique identifier for the course",
    example: 123,
    required: true,
  })
  courseId: number;

  @Expose()
  @ApiProperty({
    type: "string",
    description: "Name of the course",
    example: "NodeJS Architecture",
    required: true,
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: "string",
    format: "date-time",
    description: "Creation date of the course",
    example: "2024-01-15T10:30:00Z",
    required: true,
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    type: "string",
    format: "date-time",
    description: "Last update date of the course",
    example: "2024-01-20T14:45:00Z",
    required: false,
  })
  updatedAt: Date | null;
}
