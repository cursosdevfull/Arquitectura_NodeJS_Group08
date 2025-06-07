import { RoleEntity } from "@roles/adapters/models";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SkillEntity } from "./skill.entity";

@Entity({ name: "student" })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  studentId: number | undefined;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  phone: string;

  @Column({ type: "varchar", length: 200 })
  password: string;

  @Column({ type: "varchar", length: 200 })
  refreshToken: string;

  @Column({ type: "varchar", length: 2 })
  countryIso: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  genre: string | undefined;

  @Column({ type: "int", nullable: true })
  age: number | undefined;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | undefined | null;

  @Column({ type: "varchar", length: 200 })
  secret: string;

  @Column({ type: "text" })
  qrCode: string;

  @Column({ type: "varchar", length: 36 })
  uuid: string;

  @Column({ type: "boolean", default: false })
  enabled2Fa: boolean;

  @OneToMany(
    () => SkillEntity,
    (skill) => skill.student,
    { cascade: true },
  )
  skills: SkillEntity[];

  @ManyToOne(
    () => RoleEntity,
    (role) => role.students,
  )
  @JoinColumn({ name: "roleId" })
  role: RoleEntity;
}
