import { Injectable } from '@nestjs/common';
import { BaseAdapter } from '../../../core/base/base-adapter';
import type { Teacher } from "../application/teacher";
import type { TeacherPort } from "../ports/teacher.port";

@Injectable()
export class TeacherAdapter extends BaseAdapter<Teacher> implements TeacherPort {
    constructor() {
        super('teacherId')
    }

    async report(_dateStart: Date, _dateEnd: Date): Promise<Teacher[]> {
        return this.data
    }
    /* private teachers: Teacher[] = [];

    create(teacher: Teacher): Promise<Teacher | null> {
        this.teachers.push(teacher);
        return Promise.resolve(teacher);
    }

    update(teacher: Teacher): Promise<Teacher | null> {
        const {teacherId} = teacher.properties()
        const index = this.teachers.findIndex((t) => t.properties().teacherId === teacherId);
        if (index === -1) return Promise.resolve(null);
        this.teachers[index] = teacher;
        return Promise.resolve(teacher);
    }

    delete(teacherId: number): Promise<Teacher | null> {
        const index = this.teachers.findIndex((t) => t.properties().teacherId === teacherId);
        if (index === -1) return Promise.resolve(null);
        const deletedTeacher = this.teachers.splice(index, 1)[0];
        return Promise.resolve(deletedTeacher);
    }

    getOne(teacherId: number): Promise<Teacher | null> {
        const teacher = this.teachers.find((t) => t.properties().teacherId === teacherId);
        return Promise.resolve(teacher || null);
    }

    getAll(): Promise<Teacher[]> {
        return Promise.resolve([...this.teachers]);
    }

    getByPage(page: number, limit: number): Promise<Page<Teacher>> {
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = this.teachers.slice(start, end);
        const total = this.teachers.length;
        return Promise.resolve({ data, total, page, limit });
    } */

}