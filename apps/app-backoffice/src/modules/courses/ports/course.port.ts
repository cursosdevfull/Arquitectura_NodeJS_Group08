import { Pagination } from "@core/types";
import { Course } from "@courses/application/root";

export type CoursePort = {
  save(course: Course): Promise<Course>;
  findById(courseId: number): Promise<Course | null>;
  findByName(name: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  getByPage(page: number, limit: number): Promise<Pagination<Course>>;
};
