import { CountryEnum, GenreEnum } from "@core/enum";
import { Skill } from "../entities/skill";

export type StudentPropsRequired = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  countryIso: CountryEnum;
};

export type StudentPropsOptional = {
  studentId: number;
  genre: GenreEnum;
  age: number;
  skills: Skill[];
  deletedAt: Date | null;
};

export type StudentProps = StudentPropsRequired & Partial<StudentPropsOptional>;

export type StudentPropsUpdate = Partial<
  StudentPropsRequired &
    Omit<StudentPropsOptional, "studentId" | "deletedAt" | "email">
>;

export class Student {
  private readonly studentId: number;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private phone: string;
  private countryIso: CountryEnum;
  private genre: GenreEnum;
  private age: number;
  private skills: Skill[];
  private deletedAt: Date | null;

  constructor(props: StudentProps) {
    Object.assign(this, props);
  }

  getId(): number {
    return this.studentId;
  }

  get properties(): StudentProps {
    return {
      studentId: this.studentId,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      phone: this.phone,
      countryIso: this.countryIso,
      genre: this.genre,
      age: this.age,
      skills: this.skills,
      deletedAt: this.deletedAt,
    };
  }

  update(props: StudentPropsUpdate) {
    Object.assign(this, props);
  }

  delete() {
    this.deletedAt = new Date();
  }
}
