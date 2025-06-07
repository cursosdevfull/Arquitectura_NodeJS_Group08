import { Inject } from "@nestjs/common";
import { StudentAdapter } from "@students/adapters";
import { StudentPort } from "@students/ports";
import { Student, StudentPropsUpdate } from "./root";

export class StudentApplication {
  constructor(@Inject(StudentAdapter) private readonly port: StudentPort) {}

  async create(student: Student) {
    const studentExists = await this.port.findByEmail(student.properties.email);
    if (studentExists) throw new Error("Student already exists");

    return await this.port.save(student);
  }

  async findById(studentId: number) {
    const student = await this.port.findById(studentId);
    if (!student) throw new Error("Student not found");

    return student;
  }

  async findAll() {
    return await this.port.findAll();
  }

  async getByPage(page: number, limit: number) {
    return await this.port.getByPage(page, limit);
  }

  async update(studentId: number, props: StudentPropsUpdate) {
    const student = await this.port.findById(studentId);
    if (!student) throw new Error("Student not found");

    student.update(this.jsonFilter(props));
    return await this.port.save(student);
  }

  async delete(studentId: number) {
    const student = await this.port.findById(studentId);
    if (!student) throw new Error("Student not found");

    student.delete();

    return await this.port.save(student);
  }

  // necesito un método que reciba un objeto json y devuelva un objeto json pero sin las propiedades con un valor null o undefined
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  jsonFilter(obj: Record<string, any>): Record<string, any> {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }
}
