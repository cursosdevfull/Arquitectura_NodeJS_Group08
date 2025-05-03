import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { CourseApplication } from "../application/course.application";
import { CourseCreateDto } from "./dtos/course-create.dto";
import { CourseFactory } from "../domain/course-factory";
import { CourseIdDto } from "./dtos/course-id.dto";
import { CourseUpdateDto } from "./dtos/course-update.dto";
import { PaginationDto } from '../../../core/dtos/pagination.dto';

@Controller("course")
export class CourseController {
    constructor(private readonly application: CourseApplication) {}
    
    @Post()
    async create(@Body() body: CourseCreateDto) {
        const course = CourseFactory.create({...body, courseId: new Date().getTime()});

        return await this.application.create(course);
    }

    @Put(":courseId")
    async update(@Param() params: CourseIdDto, @Body() body: CourseUpdateDto) {
        const { courseId } = params;

        return await this.application.update(courseId, body);
    }

    @Delete(":courseId")
    async delete(@Param() params: CourseIdDto) {
        const { courseId } = params;

        return await this.application.delete(courseId);
    }

    @Get()
    async findAll() {
        console.log("findAll")
        return await this.application.findAll();
    }

    @Get("page")
    async getByPage(@Query() query: PaginationDto) {
        console.log("query", query)
        const { page, limit } = query

        console.log("query", query)

        return await this.application.getByPage(page, limit);
    }


    @Get(":courseId")
    async findById(@Param() params: CourseIdDto) {
        console.log("findById")
        const { courseId } = params;

        return await this.application.findById(courseId);
    }

}