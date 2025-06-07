import { Role } from "@roles/application";
import { plainToInstance } from "class-transformer";
import { RoleEntity } from "../models";

export class RoleDto {
  static fromDomainToData(domain: Role | Role[]): RoleEntity | RoleEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((role) =>
        RoleDto.fromDomainToData(role),
      ) as RoleEntity[];
    }

    return plainToInstance(RoleEntity, domain.properties);
  }

  static fromDataToDomain(data: RoleEntity | RoleEntity[]): Role | Role[] {
    if (Array.isArray(data)) {
      return data.map((role) => RoleDto.fromDataToDomain(role)) as Role[];
    }

    return new Role(data);
  }
}
