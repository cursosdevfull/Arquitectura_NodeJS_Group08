import { Schedule } from "../schedule";
import { Student } from "../student";

export class Certificate {
  certificateId: number;
  student: Student;
  schedule: Schedule;
  certificateDate: Date;
  certificateNumber: string;
}
