import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StudentAdapter } from "@students/adapters";
import { StudentPort } from "@students/ports";
import { StudentDeleteCommand } from "./student-delete.command";

@CommandHandler(StudentDeleteCommand)
export class StudentDeleteHandlerCommand
  implements ICommandHandler<StudentDeleteCommand>
{
  constructor(@Inject(StudentAdapter) private readonly port: StudentPort) {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async execute(command: StudentDeleteCommand): Promise<any> {
    const student = await this.port.findById(command.studentId);
    if (!student) throw new Error("Student not found");

    student.delete();

    return await this.port.save(student);
  }
}
