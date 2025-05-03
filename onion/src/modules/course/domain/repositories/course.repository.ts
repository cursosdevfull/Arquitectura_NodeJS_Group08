import { Course, CoursePropsUpdate } from "../course";
import { Pagination } from '../../../../core/types/pagination.type';

export interface CourseRepository {
    create(course: Course): Promise<Course>;
    findById(courseId: number): Promise<Course | null>;
    update(courseId: number, props: CoursePropsUpdate): Promise<Course>;
    delete(courseId: number): Promise<Course>;
    findAll(): Promise<Course[]>;
    getByPage(page: number, limit: number): Promise<Pagination<Course>>;
}