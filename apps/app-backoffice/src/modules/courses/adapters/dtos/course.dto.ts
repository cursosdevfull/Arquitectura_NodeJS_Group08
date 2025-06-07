import { Course } from "@courses/application/root";
import { plainToInstance } from "class-transformer";
import { CourseEntity } from "../models";

export class CourseDto {
  static fromDomainToData(
    domain: Course | Course[],
  ): CourseEntity | CourseEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((course) =>
        CourseDto.fromDomainToData(course),
      ) as CourseEntity[];
    }

    return plainToInstance(CourseEntity, domain.properties);
  }

  static fromDataToDomain(
    data: CourseEntity | CourseEntity[],
  ): Course | Course[] {
    if (Array.isArray(data)) {
      return data.map((course) =>
        CourseDto.fromDataToDomain(course),
      ) as Course[];
    }

    return plainToInstance(Course, data);
  }
}
