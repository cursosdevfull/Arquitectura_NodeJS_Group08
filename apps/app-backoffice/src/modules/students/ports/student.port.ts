import { Pagination } from "@core/types";
import { Student } from "..";

export type StudentPort = {
  save(student: Student): Promise<Student>;
  findById(studentId: number): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  findByUuid(uuid: string): Promise<Student | null>;
  findAll(): Promise<Student[]>;
  getByPage(page: number, limit: number): Promise<Pagination<Student>>;
};
