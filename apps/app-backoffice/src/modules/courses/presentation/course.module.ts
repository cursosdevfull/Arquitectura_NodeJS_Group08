import { DatabaseModule } from "@core/modules/database/database.module";
import { CourseAdapter } from "@courses/adapters";
import { courseProviders } from "@courses/adapters/course.providers";
import { CourseDeleteHandlerCommand } from "@courses/application/commands/course-delete-handler.command";
import { CourseApplication } from "@courses/application/course.application";
import { CourseCreatedHandlerEvent } from "@courses/application/events/course-created-handler.event";
import { CourseGetAllQueryHandler } from "@courses/application/queries/course-get-all-handler.query";
import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [
    CourseApplication,
    CourseAdapter,
    ...courseProviders,
    CourseDeleteHandlerCommand,
    CourseGetAllQueryHandler,
    CourseCreatedHandlerEvent,
  ],
})
export class CourseModule {}
