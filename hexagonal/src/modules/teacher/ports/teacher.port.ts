import { Page } from '../../../core/types/page.type';
import { Teacher } from '../application/teacher';

export type TeacherPort = {
    create(teacher: Teacher): Promise<Teacher | null>;
    update(teacher: Teacher): Promise<Teacher | null>;
    delete(teacherId: number): Promise<Teacher | null>;
    getOne(teacherId: number): Promise<Teacher | null>;
    getAll():Promise<Teacher[]>;
    getByPage(page: number, limit: number): Promise<Page<Teacher>>;
    report(dateStart: Date, dateEnd: Date): Promise<Teacher[]>;
}

/* export abstract class TeacherPortAbstract{
    abstract create(teacher: Teacher): Promise<Teacher | null>;
    abstract update(teacher: Teacher): Promise<Teacher | null>;
    abstract delete(teacherId: number): Promise<Teacher | null>;
    abstract getOne(teacherId: number): Promise<Teacher | null>;
    abstract getAll(): Promise<Teacher[]>;
    abstract getByPage(page: number, limit: number): Promise<Page<Teacher>>;
}

export class TeacherAdapterAbstract extends TeacherPortAbstract {
    create(teacher: Teacher): Promise<Teacher | null> {
        throw new Error('Method not implemented.');
    }
    update(teacher: Teacher): Promise<Teacher | null> {
        throw new Error('Method not implemented.');
    }
    delete(teacherId: number): Promise<Teacher | null> {
        throw new Error('Method not implemented.');
    }
    getOne(teacherId: number): Promise<Teacher | null> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<Teacher[]> {
        throw new Error('Method not implemented.');
    }
    getByPage(page: number, limit: number): Promise<Page<Teacher>> {
        throw new Error('Method not implemented.');
    }
} */