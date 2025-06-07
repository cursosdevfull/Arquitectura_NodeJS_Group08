import { CourseAdapter } from "@courses/adapters";
import { Course, CoursePropsUpdate } from "@courses/application/root";
import { CoursePort } from "@courses/ports";
import { Inject } from "@nestjs/common";

export class CourseApplication {
  constructor(@Inject(CourseAdapter) private readonly port: CoursePort) {}

  async create(course: Course) {
    const courseExists = await this.port.findByName(course.properties.name);
    if (courseExists) throw new Error("Course already exists");

    return await this.port.save(course);
  }

  async findById(courseId: number) {
    const course = await this.port.findById(courseId);
    if (!course) throw new Error("Course not found");

    return course;
  }

  async findAll() {
    return await this.port.findAll();
  }

  async getByPage(page: number, limit: number) {
    return await this.port.getByPage(page, limit);
  }

  async update(courseId: number, props: CoursePropsUpdate) {
    const course = await this.port.findById(courseId);
    if (!course) throw new Error("Course not found");

    course.update(this.jsonFilter(props));
    return await this.port.save(course);
  }

  async delete(courseId: number) {
    const course = await this.port.findById(courseId);
    if (!course) throw new Error("Course not found");

    course.delete();
    return await this.port.save(course);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  jsonFilter(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
      Object.entries(obj).filter(([, value]) => value != null),
    );
  }
}
