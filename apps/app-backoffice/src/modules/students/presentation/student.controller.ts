import { Permisions } from "@core/decorators";
import { PaginationDto } from "@core/dtos";
import {
  ExceptionResponseErrorClient,
  ExceptionResponseErrorServer,
} from "@core/errors";
import { AuthenticationGuard, AuthorizationGuard } from "@core/guards";
import { CacheableInterceptor } from "@core/interceptors";
import { OtpService } from "@core/modules/otp/otp.service";
import { CypherService } from "@core/services";
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
import {
  Student,
  StudentProps,
  StudentPropsUpdate,
} from "@students/application";
import { StudentApplication } from "@students/application";
import { StudentCreatedEvent } from "@students/application/events";
import { StudentGetAllQuery } from "@students/application/queries";
import { plainToInstance } from "class-transformer";
import * as qr from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { StudentDeleteCommand } from "../application/commands/student-delete.command";
import {
  StudentCreateDto,
  StudentIdDto,
  StudentResponseDto,
  StudentUpdateDto,
} from "./dtos";

@Controller("student")
export class StudentController {
  constructor(
    @Inject(StudentApplication)
    private readonly application: StudentApplication,
    private readonly otpService: OtpService,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private eventBus: EventBus, // Assuming you have an EventBus for handling events
  ) {}

  @Post()
  @Version("1")
  @Permisions("student:create")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async create(@Body() body: StudentCreateDto) {
    const props: StudentProps = body;
    props.password = await CypherService.hash(props.password);
    props.refreshToken = "";
    props.uuid = uuidv4();
    const otp = this.otpService.generateOtp();
    const { base32: secret, otpauth_url } = otp;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    props.qrCode = await qr.toDataURL(otpauth_url!);
    props.secret = secret;

    const student = new Student(props);

    const studentCreated = await this.application.create(student);

    const { name, lastname, email } = studentCreated.properties;
    const studentCreatedEvent = new StudentCreatedEvent(name, lastname, email);

    this.eventBus.publish(studentCreatedEvent);

    return plainToInstance(StudentResponseDto, studentCreated.properties);
  }

  @Get()
  @Version("1")
  @Permisions("student:list")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @UseInterceptors(CacheableInterceptor)
  @ApiOperation({
    summary: "Get all students",
    description: "Retrieve a list of all students",
  })
  @ApiResponse({
    status: 200,
    description: "List of students retrieved successfully",
    type: StudentResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
    type: ExceptionResponseErrorClient,
  })
  @ApiResponse({
    status: "5XX",
    description: "Internal server error",
    type: ExceptionResponseErrorServer,
  })
  @ApiResponse({
    status: "4XX",
    description: "Invalid credentials",
    type: ExceptionResponseErrorClient,
  })
  @ApiBearerAuth()
  async getAll() {
    const query = new StudentGetAllQuery();
    const result = await this.queryBus.execute(query);

    return result.map((student) =>
      plainToInstance(StudentResponseDto, student.properties, {
        groups: ["ADMIN"],
      }),
    );
  }

  @Get("page")
  @Version("1")
  @Permisions("student:pagination")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @UseInterceptors(CacheableInterceptor)
  async getAllByPage(@Query() query: PaginationDto) {
    const { page, limit } = query;
    const result = await this.application.getByPage(page, limit);

    return {
      ...result,
      items: result.items.map((student) =>
        plainToInstance(StudentResponseDto, student.properties),
      ),
    };
  }

  @Get(":studentId")
  @Version("1")
  @Permisions("student:read")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async getById(@Param() params: StudentIdDto) {
    const { studentId } = params;
    const result = await this.application.findById(studentId);

    return plainToInstance(StudentResponseDto, result.properties);
  }

  @Put(":studentId")
  @Version("1")
  @Permisions("student:update")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async update(@Param() params: StudentIdDto, @Body() body: StudentUpdateDto) {
    const { studentId } = params;

    const props: StudentPropsUpdate = body;
    if (props.password) {
      props.password = await CypherService.hash(props.password);
    }

    const result = await this.application.update(studentId, props);
    return plainToInstance(StudentResponseDto, result.properties);
  }

  @Delete(":studentId")
  @Version("1")
  @Permisions("student:delete")
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async delete(@Param() params: StudentIdDto) {
    const { studentId } = params;

    const command = new StudentDeleteCommand(studentId);
    const result = await this.commandBus.execute(command);
    return plainToInstance(StudentResponseDto, result.properties);
  }
}
