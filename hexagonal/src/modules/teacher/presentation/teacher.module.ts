import { Module } from "@nestjs/common";
import { TeacherAdapter } from "../adapters/teacher.adapter";
import { TeacherApplication } from "../application/teacher.application";
import { TeacherController } from "./teacher.controller";

@Module({
    controllers: [TeacherController],
    providers: [
        TeacherApplication,
        TeacherAdapter

    ]
})
export class TeacherModule { }