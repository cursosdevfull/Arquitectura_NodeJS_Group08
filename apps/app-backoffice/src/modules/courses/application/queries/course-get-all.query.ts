import { Query } from "@nestjs/cqrs";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class CourseGetAllQuery extends Query<any> {}
