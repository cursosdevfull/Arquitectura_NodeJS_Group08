import { Permisions } from "@core/decorators";
import { PaginationDto } from "@core/dtos";
import {
  ExceptionResponseErrorClient,
  ExceptionResponseErrorServer,
} from "@core/errors";
import { AuthenticationGuard, AuthorizationGuard } from "@core/guards";
import { CacheableInterceptor } from "@core/interceptors";
import { CourseApplication } from "@courses/application/course.application";
import { CourseCreatedEvent } from "@courses/application/events";
import { CourseGetAllQuery } from "@courses/application/queries";
import {
  Course,
  CourseProps,
  CoursePropsUpdate,
} from "@courses/application/root";
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
  UseGuards,
  UseInterceptors,
  Version,
} from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CourseDeleteCommand } from "../application/commands/course-delete.command";
import {
  CourseCreateDto,
  CourseIdDto,
  CourseResponseDto,
  CourseUpdateDto,
} from "./dtos";

@Controller("course")
export class CourseController {
  constructor(
    @Inject(CourseApplication)
    private readonly application: CourseApplication,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  @Post()
  @Version("1")
  @Permisions("course:create")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiOperation({
    summary: "Create a new course",
    description: "Create a new course in the system",
  })
  @ApiResponse({
    status: 201,
    description: "Course created successfully",
    type: CourseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiBearerAuth()
  async create(@Body() body: CourseCreateDto) {
    const props: CourseProps = body;

    const course = new Course(props);

    const courseCreated = await this.application.create(course);

    const { name } = courseCreated.properties;
    const courseCreatedEvent = new CourseCreatedEvent(name);

    this.eventBus.publish(courseCreatedEvent);

    return plainToInstance(CourseResponseDto, courseCreated.properties);
  }

  @Get()
  @Version("1")
  @Permisions("course:list")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @UseInterceptors(CacheableInterceptor)
  @ApiOperation({
    summary: "Get all courses",
    description: "Retrieve a list of all courses",
  })
  @ApiResponse({
    status: 200,
    description: "List of courses retrieved successfully",
    type: CourseResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiBearerAuth()
  async getAll() {
    const query = new CourseGetAllQuery();
    const result = await this.queryBus.execute(query);

    return result.map((course) =>
      plainToInstance(CourseResponseDto, course.properties),
    );
  }

  @Get("page")
  @Version("1")
  @Permisions("course:pagination")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @UseInterceptors(CacheableInterceptor)
  @ApiOperation({
    summary: "Get courses with pagination",
    description: "Retrieve a paginated list of courses",
  })
  @ApiResponse({
    status: 200,
    description: "Paginated list of courses retrieved successfully",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiBearerAuth()
  async getAllByPage(@Query() query: PaginationDto) {
    const { page, limit } = query;
    const result = await this.application.getByPage(page, limit);

    return {
      ...result,
      items: result.items.map((course) =>
        plainToInstance(CourseResponseDto, course.properties),
      ),
    };
  }

  @Get(":courseId")
  @Version("1")
  @Permisions("course:read")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @UseInterceptors(CacheableInterceptor)
  @ApiOperation({
    summary: "Get course by ID",
    description: "Retrieve a specific course by its ID",
  })
  @ApiResponse({
    status: 200,
    description: "Course retrieved successfully",
    type: CourseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Course not found",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiBearerAuth()
  async getById(@Param() params: CourseIdDto) {
    const { courseId } = params;
    const result = await this.application.findById(courseId);

    return plainToInstance(CourseResponseDto, result.properties);
  }

  @Put(":courseId")
  @Version("1")
  @Permisions("course:update")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiOperation({
    summary: "Update course",
    description: "Update an existing course",
  })
  @ApiResponse({
    status: 200,
    description: "Course updated successfully",
    type: CourseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Course not found",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiBearerAuth()
  async update(@Param() params: CourseIdDto, @Body() body: CourseUpdateDto) {
    const { courseId } = params;

    const props: CoursePropsUpdate = body;

    const result = await this.application.update(courseId, props);
    return plainToInstance(CourseResponseDto, result.properties);
  }

  @Delete(":courseId")
  @Version("1")
  @Permisions("course:delete")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @ApiOperation({
    summary: "Delete course",
    description: "Soft delete a course",
  })
  @ApiResponse({
    status: 200,
    description: "Course deleted successfully",
    type: CourseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Course not found",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiBearerAuth()
  async delete(@Param() params: CourseIdDto) {
    const { courseId } = params;

    const command = new CourseDeleteCommand(courseId);
    const result = await this.commandBus.execute(command);
    return plainToInstance(CourseResponseDto, result.properties);
  }
}
