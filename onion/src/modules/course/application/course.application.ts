import { Inject } from "@nestjs/common";
import { Course, CoursePropsUpdate } from "../domain/course";
import { CourseRepository } from "../domain/repositories/course.repository";
import { CourseInfrastructure } from "../infrastructure/course.infrastructure";

export class CourseApplication {
    constructor(@Inject(CourseInfrastructure) private readonly repository: CourseRepository){}

    async create(course: Course) {
        return await this.repository.create(course);
    }

    async findById(courseId: number) {
        return await this.repository.findById(courseId);
    }

    async update(courseId: number, props: CoursePropsUpdate) {
        return await this.repository.update(courseId, props);
    }

    async delete(courseId: number) {
        return await this.repository.delete(courseId);
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async getByPage(page: number, limit: number) {
        return await this.repository.getByPage(page, limit);
    }

}