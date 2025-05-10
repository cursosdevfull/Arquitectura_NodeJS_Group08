import { Pagination } from "@core/types";
import { Student } from "..";

export type StudentPort = {
  save(student: Student): Promise<Student>;
  findById(studentId: number): Promise<Student | null>;
  findAll(): Promise<Student[]>;
  getByPage(page: number, limit: number): Promise<Pagination<Student>>;
  /*     findByEmail(email: string): Promise<Student | null>;
    findByPhone(phone: string): Promise<Student | null>;
    findByName(name: string): Promise<Student | null>;
    findByLastname(lastname: string): Promise<Student | null>; */
};
