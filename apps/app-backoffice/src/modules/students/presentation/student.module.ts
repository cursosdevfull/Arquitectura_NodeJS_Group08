import { DatabaseModule } from "@core/modules/database/database.module";
import { Module } from "@nestjs/common";
import { StudentAdapter } from "@students/adapters";
import { studentProviders } from "@students/adapters/student.providers";
import { StudentApplication } from "@students/application/student.application";
import { StudentController } from "./student.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [StudentApplication, StudentAdapter, ...studentProviders],
})
export class StudentModule {}
