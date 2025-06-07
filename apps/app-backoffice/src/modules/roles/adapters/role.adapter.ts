import { Inject } from "@nestjs/common";
import { Role } from "@roles/application/root";
import { RolePort } from "@roles/ports";
import { Repository } from "typeorm";
import { RoleDto } from "./dtos";
import { RoleEntity } from "./models";

export class RoleAdapter implements RolePort {
  constructor(
    @Inject("ROLE_REPOSITORY")
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async save(role: Role): Promise<Role> {
    const roleEntity = RoleDto.fromDomainToData(role) as RoleEntity;

    const result = await this.repository.save(roleEntity);

    return RoleDto.fromDataToDomain(result) as Role;
  }

  async findById(roleId: number): Promise<Role | null> {
    const result = await this.repository.findOne({
      where: { roleId },
    });

    if (result) {
      return RoleDto.fromDataToDomain(result) as Role;
    }

    return null;
  }

  async findByName(name: string): Promise<Role | null> {
    const result = await this.repository.findOne({
      where: { name },
    });

    if (result) {
      return RoleDto.fromDataToDomain(result) as Role;
    }

    return null;
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.repository.find({
      order: { name: "ASC" },
    });

    return roles.map((student) => RoleDto.fromDataToDomain(student)) as Role[];
  }
}
