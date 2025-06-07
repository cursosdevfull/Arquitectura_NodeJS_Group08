import { Auth } from "@auth/application";
import { AuthPort } from "@auth/ports";
import { Inject } from "@nestjs/common";
import { StudentDto } from "@students/adapters/dtos";
import { StudentEntity } from "@students/adapters/models";
import { Student } from "@students/index";
import { IsNull, Repository } from "typeorm";

export class AuthAdapter implements AuthPort {
  constructor(
    @Inject("STUDENT_REPOSITORY")
    private readonly repository: Repository<StudentEntity>,
  ) {}

  async findByEmail(auth: Auth): Promise<Student | null> {
    const { email } = auth.properties;

    const student = await this.repository.findOne({
      where: { email, deletedAt: IsNull() },
      relations: ["role"],
    });
    if (!student) return null;

    return StudentDto.fromDataToDomain(student) as Student;
  }

  async findByUuid(uuid: string): Promise<Student | null> {
    const student = await this.repository.findOne({
      where: { uuid, deletedAt: IsNull() },
      relations: ["role"],
    });
    if (!student) return null;

    return StudentDto.fromDataToDomain(student) as Student;
  }

  async findByRefreshToken(refreshToken: string): Promise<Student | null> {
    const student = await this.repository.findOne({
      where: { refreshToken, deletedAt: IsNull() },
      relations: ["role"],
    });
    if (!student) return null;

    return StudentDto.fromDataToDomain(student) as Student;
  }

  async logout(refreshToken: string): Promise<string | null> {
    const student = await this.repository.findOne({
      where: { refreshToken, deletedAt: IsNull() },
    });
    if (!student) return null;

    student.refreshToken = "";

    await this.repository.save(student);
    return refreshToken;
  }

  async save(student: Student): Promise<Student> {
    const studentEntity = StudentDto.fromDomainToData(student) as StudentEntity;

    const result = await this.repository.save(studentEntity);

    return StudentDto.fromDataToDomain(result) as Student;
  }
}
