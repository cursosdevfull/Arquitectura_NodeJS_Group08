import { Pagination } from "@core/types";
import { Inject } from "@nestjs/common";
import { Student } from "@students/application";
import { StudentPort } from "@students/ports";
import { IsNull, Repository } from "typeorm";
import { StudentDto } from "./dtos";
import { StudentEntity } from "./models/student.entity";

export class StudentAdapter implements StudentPort {
  constructor(
    @Inject("STUDENT_REPOSITORY")
    private readonly repository: Repository<StudentEntity>,
  ) {}

  async save(student: Student): Promise<Student> {
    const studentEntity = StudentDto.fromDomainToData(student) as StudentEntity;

    const result = await this.repository.save(studentEntity);

    return StudentDto.fromDataToDomain(result) as Student;
  }

  async findById(studentId: number): Promise<Student | null> {
    const result = await this.repository.findOne({
      where: { studentId, deletedAt: IsNull() },
      relations: ["role", "skills"],
    });

    if (result) {
      return StudentDto.fromDataToDomain(result) as Student;
    }

    return null;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const result = await this.repository.findOne({
      where: { email, deletedAt: IsNull() },
      relations: ["role", "skills"],
    });

    if (result) {
      return StudentDto.fromDataToDomain(result) as Student;
    }

    return null;
  }

  async findByUuid(uuid: string): Promise<Student | null> {
    const result = await this.repository.findOne({
      where: { uuid, deletedAt: IsNull() },
      relations: ["role", "skills"],
    });

    if (result) {
      return StudentDto.fromDataToDomain(result) as Student;
    }

    return null;
  }

  async findAll(): Promise<Student[]> {
    const students = await this.repository.find({
      where: { deletedAt: IsNull() },
      relations: ["skills", "role"],
    });

    return students.map((student) =>
      StudentDto.fromDataToDomain(student),
    ) as Student[];
  }

  async getByPage(page: number, limit: number): Promise<Pagination<Student>> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [result, count] = await this.repository.findAndCount({
      skip,
      take,
      where: { deletedAt: IsNull() },
      relations: ["skills", "role"],
      order: { lastname: "ASC", name: "DESC" },
    });

    const students = StudentDto.fromDataToDomain(result) as Student[];

    return {
      page,
      limit,
      total: count,
      items: students,
    };
  }
}
