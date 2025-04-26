import { Schedule } from "../schedule";
import { Student } from "../student";

export class Enrollment {
  enrollmentId: number;
  schedule: Schedule;
  student: Student;
  enrollmentDate: Date;
}
