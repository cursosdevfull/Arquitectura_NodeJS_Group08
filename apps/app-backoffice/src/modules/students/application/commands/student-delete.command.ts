import { Command } from "@nestjs/cqrs";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class StudentDeleteCommand extends Command<any> {
  constructor(public readonly studentId: number) {
    super();
  }
}
