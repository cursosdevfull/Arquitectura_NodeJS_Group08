import { StudentEntity } from "@students/adapters/models";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @Column({ type: "text" })
  actions: string;

  @OneToMany(
    () => StudentEntity,
    (student) => student.role,
  )
  students: StudentEntity[];
}
