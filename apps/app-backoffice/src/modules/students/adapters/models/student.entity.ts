import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SkillEntity } from "./skill.entity";

@Entity({ name: "student" })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  studentId: number | undefined;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  phone: string;

  @Column({ type: "varchar", length: 200 })
  password: string;

  @Column({ type: "varchar", length: 2 })
  countryIso: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  genre: string | undefined;

  @Column({ type: "int", nullable: true })
  age: number | undefined;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | undefined | null;

  @OneToMany(
    () => SkillEntity,
    (skill) => skill.student,
    { cascade: true },
  )
  skills: SkillEntity[];
}
