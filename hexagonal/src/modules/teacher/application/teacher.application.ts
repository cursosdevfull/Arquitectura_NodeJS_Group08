import { Inject } from "@nestjs/common";
import type { TeacherPort } from "../ports/teacher.port";
import type { Teacher } from "./teacher";
import { TeacherAdapter } from "../adapters/teacher.adapter";

export class TeacherApplication {
    constructor(@Inject(TeacherAdapter) private readonly port: TeacherPort) {}

    async create(teacher: Teacher) {
        return await this.port.create(teacher)
    }

    async update(teacher: Teacher) {
        return await this.port.update(teacher)
    }

    async delete(teacherId: number) {
        return await this.port.delete(teacherId)
    }

    async getOne(teacherId: number) {
        return await this.port.getOne(teacherId)
    }

    async getAll() {
        return await this.port.getAll()
    }

    getByPage(page: number, limit: number) {
        return this.port.getByPage(page, limit)
    }

}