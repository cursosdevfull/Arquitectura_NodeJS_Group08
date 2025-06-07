import { Auth } from "@auth/application";
import { Student } from "@students/index";

export type AuthPort = {
  findByEmail(auth: Auth): Promise<Student | null>;
  findByUuid(uuid: string): Promise<Student | null>;
  findByRefreshToken(refreshToken: string): Promise<Student | null>;
  logout(refreshToken: string): Promise<string | null>;

  save(student: Student): Promise<Student>;
};
