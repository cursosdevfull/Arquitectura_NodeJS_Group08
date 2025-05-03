import { Pagination } from "src/core/types/pagination.type";
import { Course, CoursePropsUpdate } from "../domain/course";
import { CourseRepository } from "../domain/repositories/course.repository";

export class CourseInfrastructure implements CourseRepository {
    private courses: Course[] = [];

    create(course: Course): Promise<Course> {
        this.courses.push(course);
        return Promise.resolve(course);
    }
    findById(courseId: number): Promise<Course | null> {
        const course = this.courses.find(course => course.properties.courseId === courseId);
        return Promise.resolve(course || null);
    }
    update(courseId: number, props: CoursePropsUpdate): Promise<Course> {
        const courseIndex = this.courses.findIndex(course => course.properties.courseId === courseId);
        if (courseIndex === -1) {
            return Promise.reject(new Error("Course not found"));
        }
        const updatedCourse = this.courses[courseIndex];
        updatedCourse.update(props);
        this.courses[courseIndex] = updatedCourse;
        return Promise.resolve(updatedCourse);
    }
    delete(courseId: number): Promise<Course> {
        const courseIndex = this.courses.findIndex(course => course.properties.courseId === courseId);
        if (courseIndex === -1) {
            return Promise.reject(new Error("Course not found"));
        }
        const deletedCourse = this.courses.splice(courseIndex, 1)[0];
        return Promise.resolve(deletedCourse);
    }
    findAll(): Promise<Course[]> {
        return Promise.resolve(this.courses);
    }
    getByPage(page: number, limit: number): Promise<Pagination<Course>> {
        const total = this.courses.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = this.courses.slice(start, end);
        return Promise.resolve({
            page,
            limit,
            total,
            items
        });
    }
}