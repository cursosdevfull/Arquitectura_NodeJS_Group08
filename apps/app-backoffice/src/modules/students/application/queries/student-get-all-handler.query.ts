import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { StudentAdapter } from "@students/adapters";
import { StudentPort } from "@students/ports";
import { StudentGetAllQuery } from "./student-get-all.query";

@QueryHandler(StudentGetAllQuery)
export class StudentGetAllQueryHandlder
  implements IQueryHandler<StudentGetAllQuery>
{
  constructor(@Inject(StudentAdapter) private readonly port: StudentPort) {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async execute(_query: StudentGetAllQuery): Promise<any> {
    return await this.port.findAll();
  }
}
