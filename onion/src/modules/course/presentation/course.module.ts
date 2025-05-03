import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseApplication } from "../application/course.application";
import { CourseInfrastructure } from "../infrastructure/course.infrastructure";

@Module({
    controllers: [CourseController],
    providers: [
        CourseApplication,
        CourseInfrastructure
    ]
})
export class CourseModule {

}