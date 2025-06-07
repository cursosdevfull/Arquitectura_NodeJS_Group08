import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { RoleDto } from "./role.dto";
import { SkillDto } from "./skill.dto";

export class StudentResponseDto {
  @Expose()
  @ApiProperty({
    type: "number",
    description: "Unique identifier for the student",
    example: 123,
    required: true,
  })
  studentId: number;

  @ApiProperty({
    type: "string",
    description: "Name of the student",
    example: "John",
    required: true,
  })
  @Expose(/*{groups: ["ADMIN"]}*/)
  name: string;

  @ApiProperty({
    type: "string",
    description: "Last name of the student",
    example: "Doe",
    required: true,
  })
  @Expose()
  lastname: string;

  @ApiProperty({
    type: "string",
    description: "Email address of the student",
    example: "user@email.com",
    required: true,
  })
  @Expose()
  email: string;

  @ApiProperty({
    type: "string",
    description: "Phone number of the student",
    example: "+1234567890",
    required: true,
  })
  @Expose()
  phone: string;

  @ApiProperty({
    required: true,
    type: RoleDto,
  })
  @Expose()
  role: RoleDto;

  @ApiProperty({
    type: SkillDto,
    description: "List of skills associated with the student",
    required: true,
    isArray: true,
  })
  @Expose()
  skills: SkillDto[];

  @ApiProperty({
    type: "string",
    description: "Country ISO code of the student",
    example: "US",
    required: true,
  })
  @Expose()
  countryIso: string;

  @ApiProperty({
    type: "string",
    description: "Genre of the student",
    example: "Male",
    required: true,
  })
  @Expose()
  genre: string;

  @ApiProperty({
    type: "string",
    description: "Age of the student",
    example: "25",
    required: true,
  })
  @Expose()
  age: string;

  @ApiProperty({
    type: "string",
    description: "UUID of the student",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: true,
  })
  @Expose()
  uuid: string;

  @ApiProperty({
    type: "boolean",
    description:
      "Indicates if the student has enabled two-factor authentication",
    example: true,
    required: true,
  })
  @Expose()
  enabled2Fa: boolean;

  @Exclude()
  password: string;

  @Exclude()
  deletedAt: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;

  @Exclude()
  secret: string;

  @Exclude()
  qrCode: string;

  @Exclude()
  refreshToken: string;
}
