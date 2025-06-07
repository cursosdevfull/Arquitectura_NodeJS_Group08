import { Pagination } from "@core/types";
import { Course } from "@courses/application/root";
import { CoursePort } from "@courses/ports";
import { Inject } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { CourseDto } from "./dtos";
import { CourseEntity } from "./models/course.entity";

export class CourseAdapter implements CoursePort {
  constructor(
    @Inject("COURSE_REPOSITORY")
    private readonly repository: Repository<CourseEntity>,
  ) {}

  async save(course: Course): Promise<Course> {
    const courseEntity = CourseDto.fromDomainToData(course) as CourseEntity;

    const result = await this.repository.save(courseEntity);

    return CourseDto.fromDataToDomain(result) as Course;
  }

  async findById(courseId: number): Promise<Course | null> {
    const result = await this.repository.findOne({
      where: { courseId, deletedAt: IsNull() },
    });

    if (result) {
      return CourseDto.fromDataToDomain(result) as Course;
    }

    return null;
  }

  async findByName(name: string): Promise<Course | null> {
    const result = await this.repository.findOne({
      where: { name, deletedAt: IsNull() },
    });

    if (result) {
      return CourseDto.fromDataToDomain(result) as Course;
    }

    return null;
  }

  async findAll(): Promise<Course[]> {
    const courses = await this.repository.find({
      where: { deletedAt: IsNull() },
      order: { name: "ASC" },
    });

    return courses.map((course) =>
      CourseDto.fromDataToDomain(course),
    ) as Course[];
  }

  async getByPage(page: number, limit: number): Promise<Pagination<Course>> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [result, count] = await this.repository.findAndCount({
      skip,
      take,
      where: { deletedAt: IsNull() },
      order: { name: "ASC" },
    });

    const courses = CourseDto.fromDataToDomain(result) as Course[];

    return {
      page,
      limit,
      total: count,
      items: courses,
    };
  }
}
