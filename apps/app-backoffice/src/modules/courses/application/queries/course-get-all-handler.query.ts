import { CourseAdapter } from "@courses/adapters";
import { CoursePort } from "@courses/ports";
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CourseGetAllQuery } from "./course-get-all.query";

@QueryHandler(CourseGetAllQuery)
export class CourseGetAllQueryHandler
  implements IQueryHandler<CourseGetAllQuery>
{
  constructor(@Inject(CourseAdapter) private readonly port: CoursePort) {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async execute(_query: CourseGetAllQuery): Promise<any> {
    return await this.port.findAll();
  }
}
