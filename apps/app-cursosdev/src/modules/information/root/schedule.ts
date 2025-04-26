import { Course } from "../course";

export class Schedule {
  scheduleId: number;
  course: Course;
  syllabus: string[];
  slogan: string;
  summary: string;
  image: string;
  description: string;
  startDate: Date;
  frequency: string;
  duration: number;
  price: number;
}
