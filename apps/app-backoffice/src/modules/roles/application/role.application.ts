import { Inject } from "@nestjs/common";
import { RoleAdapter } from "@roles/adapters";
import { RolePort } from "@roles/ports";
import { Role } from "./root";

export class RoleApplication {
  constructor(@Inject(RoleAdapter) private readonly port: RolePort) {}

  async create(role: Role): Promise<Role> {
    return await this.port.save(role);
  }

  async findById(roleId: number): Promise<Role | null> {
    const role = await this.port.findById(roleId);
    if (!role) throw new Error("Role not found");
    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.port.findByName(name);
    if (!role) throw new Error("Role not found");
    return role;
  }

  async findAll(): Promise<Role[]> {
    return await this.port.findAll();
  }
}
