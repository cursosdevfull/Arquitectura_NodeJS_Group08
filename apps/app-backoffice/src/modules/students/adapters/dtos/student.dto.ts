import { Student } from "@students/application";
import { plainToInstance } from "class-transformer";
import { StudentEntity } from "../models";

export class StudentDto {
  static fromDomainToData(
    domain: Student | Student[],
  ): StudentEntity | StudentEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((student) =>
        StudentDto.fromDomainToData(student),
      ) as StudentEntity[];
    }
    /* return domain.map((student) => {
                return plainToInstance(StudentEntity, student.properties)
            }) */

    return plainToInstance(StudentEntity, domain.properties);
  }

  static fromDataToDomain(
    data: StudentEntity | StudentEntity[],
  ): Student | Student[] {
    if (Array.isArray(data)) {
      return data.map((student) =>
        StudentDto.fromDataToDomain(student),
      ) as Student[];
    }
    return plainToInstance(Student, data);
  }
}
