import { DatabaseModule } from "@core/modules/database/database.module";
import { OtpModule } from "@core/modules/otp/otp.module";
import { Module } from "@nestjs/common";
import { StudentAdapter } from "@students/adapters";
import { studentProviders } from "@students/adapters/student.providers";
import { StudentDeleteHandlerCommand } from "@students/application/commands/student-delete-handler.command";
import { StudentCreatedHandlerEvent } from "@students/application/events/student-created-handler.event";
import { StudentGetAllQueryHandlder } from "@students/application/queries/student-get-all-handler.query";
import { StudentApplication } from "@students/application/student.application";
import { StudentController } from "./student.controller";

@Module({
  imports: [DatabaseModule, OtpModule],
  controllers: [StudentController],
  providers: [
    StudentApplication,
    StudentAdapter,
    ...studentProviders,
    StudentDeleteHandlerCommand,
    StudentGetAllQueryHandlder,
    StudentCreatedHandlerEvent,
  ],
})
export class StudentModule {}
