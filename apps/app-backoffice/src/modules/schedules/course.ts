export class Course {
  readonly courseId: number;
  readonly title: string | undefined;

  constructor(courseId: number, title: string | undefined) {
    this.courseId = courseId;
    this.title = title;
  }
}
