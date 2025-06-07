import { CourseAdapter } from "@courses/adapters";
import { CoursePort } from "@courses/ports";
import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CourseDeleteCommand } from "./course-delete.command";

@CommandHandler(CourseDeleteCommand)
export class CourseDeleteHandlerCommand
  implements ICommandHandler<CourseDeleteCommand>
{
  constructor(@Inject(CourseAdapter) private readonly port: CoursePort) {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async execute(command: CourseDeleteCommand): Promise<any> {
    const { courseId } = command;

    const course = await this.port.findById(courseId);
    if (!course) throw new Error("Course not found");

    course.delete();
    return await this.port.save(course);
  }
}
