import { PaginationDto } from "@core/dtos";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  Student,
  StudentProps,
  StudentPropsUpdate,
} from "@students/application";
import { StudentApplication } from "@students/application";
import { StudentCreateDto, StudentIdDto, StudentUpdateDto } from "./dtos";

@Controller("student")
export class StudentController {
  constructor(
    @Inject(StudentApplication)
    private readonly application: StudentApplication,
  ) {}

  @Post()
  async create(@Body() body: StudentCreateDto) {
    const props: StudentProps = body;

    const student = new Student(props);

    return await this.application.create(student);
  }

  @Get()
  async getAll() {
    return await this.application.findAll();
  }

  @Get("page")
  async getAllByPage(@Query() query: PaginationDto) {
    const { page, limit } = query;
    return await this.application.getByPage(page, limit);
  }

  @Get(":studentId")
  async getById(@Param() params: StudentIdDto) {
    const { studentId } = params;
    return await this.application.findById(studentId);
  }

  @Put(":studentId")
  async update(@Param() params: StudentIdDto, @Body() body: StudentUpdateDto) {
    const { studentId } = params;

    const props: StudentPropsUpdate = body;

    return await this.application.update(studentId, props);
  }

  @Delete(":studentId")
  async delete(@Param() params: StudentIdDto) {
    const { studentId } = params;
    return await this.application.delete(studentId);
  }
}
