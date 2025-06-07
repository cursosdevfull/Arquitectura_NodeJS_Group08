import { CountryEnum, GenreEnum } from "@core/enum";
import { Role } from "../entities";
import { Skill } from "../entities/skill";

export type StudentPropsRequired = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  countryIso: CountryEnum;
  role: Role;
};

export type StudentPropsOptional = {
  studentId: number;
  refreshToken: string;
  genre: GenreEnum;
  age: number;
  skills: Skill[];
  deletedAt: Date | null;
  secret: string;
  qrCode: string;
  uuid: string;
  enabled2Fa: boolean;
};

export type StudentProps = StudentPropsRequired & Partial<StudentPropsOptional>;

export type StudentPropsUpdate = Partial<
  StudentPropsRequired &
    Omit<
      StudentPropsOptional,
      | "studentId"
      | "deletedAt"
      | "email"
      | "refreshToken"
      | "secret"
      | "qrCode"
      | "uuid"
      | "enabled2Fa"
    >
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
  private refreshToken: string;
  private secret: string;
  private qrCode: string;
  private uuid: string;
  private enabled2Fa: boolean;
  private role: Role;

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
      refreshToken: this.refreshToken,
      phone: this.phone,
      countryIso: this.countryIso,
      genre: this.genre,
      age: this.age,
      skills: this.skills,
      deletedAt: this.deletedAt,
      secret: this.secret,
      qrCode: this.qrCode,
      uuid: this.uuid,
      enabled2Fa: this.enabled2Fa,
      role: this.role,
    };
  }

  update(props: StudentPropsUpdate) {
    Object.assign(this, props);
  }

  updateRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  updateEnabled2Fa() {
    this.enabled2Fa = true;
  }

  delete() {
    this.deletedAt = new Date();
  }
}
