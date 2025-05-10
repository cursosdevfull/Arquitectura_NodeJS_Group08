import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity({ name: "skill" })
export class SkillEntity {
  @PrimaryGeneratedColumn()
  skillId: number;

  @Column({ type: "varchar", length: 50 })
  description: string;

  @Column({ type: "varchar", length: 50 })
  level: string;

  @ManyToOne(
    () => StudentEntity,
    (student) => student.skills,
  )
  @JoinColumn({ name: "studentId" })
  student: StudentEntity;
}
