import { Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import { PageDto } from '../../../core/dtos/page.dto';
import { Teacher, TeacherProps, TeacherPropsUpdate } from "../application/teacher";
import { TeacherApplication } from "../application/teacher.application";
import { TeacherCreateDto } from './dtos/teacher-create.dto';
import { TeacherIdDto } from "./dtos/teacher-id.dto";
import { TeacherUpdateDto } from "./dtos/teacher-update.dto";


@Controller("teacher")
export class TeacherController {

    constructor(private readonly application: TeacherApplication) {}


    @Post()
    async create(@Body() body:TeacherCreateDto) {
        const {names, lastname, email} = body

        const props: TeacherProps = {
            teacherId: new Date().getTime(),
            names,
            lastname,
            email
        }

        const teacher = new Teacher(props)
        return await this.application.create(teacher)
    }

    @Get()
    async getAll() {
        return await this.application.getAll()
    }

    @Delete(":id")
    async delete(@Param() params: TeacherIdDto) {
        const { id } = params
        return await this.application.delete(id)
    }

    @Put(":id")
    async update(@Body() body: TeacherUpdateDto, @Param() params: TeacherIdDto) {
        const { id } = params
        const { names, lastname, email, phone, address } = body

        const props: TeacherPropsUpdate = {
            names,
            lastname,
            email,
            phone,
            address,
        }

        const teacher = await this.application.getOne(id)

        if(teacher) {
            teacher.update(props)
            return await this.application.update(teacher)
        }

        return null
    }

    @Get("by-page")
    async getByPage(@Query() query: PageDto) {
        const { page, limit } = query
        return await this.application.getByPage(page, limit)
    }
}