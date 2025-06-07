import { Body, Controller, Get, Inject, Post, Version } from "@nestjs/common";
import { Role, RoleProps } from "@roles/application";
import { RoleApplication } from "@roles/application";
import { RoleCreateDto } from "./dtos";

@Controller("role")
export class RoleController {
  constructor(
    @Inject(RoleApplication)
    private readonly application: RoleApplication,
  ) {}

  @Post()
  @Version("1")
  async create(@Body() body: RoleCreateDto) {
    const props: RoleProps = body;

    const role = new Role(props);

    return await this.application.create(role);
  }

  @Get()
  @Version("1")
  async getAll() {
    return await this.application.findAll();
  }

  @Get()
  @Version("2")
  async getAll2() {
    return {
      message: "Hello from version 2",
      data: await this.application.findAll(),
    };
  }
}
