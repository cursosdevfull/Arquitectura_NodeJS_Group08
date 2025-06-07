import { Role } from "@roles/application/root";

export type RolePort = {
  save(role: Role): Promise<Role>;
  findById(studentId: number): Promise<Role | null>;
  findByName(email: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
};
