export type CoursePropsRequired = {
  name: string;
};

export type CoursePropsOptional = {
  courseId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type CourseProps = CoursePropsRequired & Partial<CoursePropsOptional>;

export type CoursePropsUpdate = Partial<
  CoursePropsRequired &
    Omit<
      CoursePropsOptional,
      "courseId" | "deletedAt" | "createdAt" | "updatedAt"
    >
>;

export class Course {
  private readonly courseId: number;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(props: CourseProps) {
    Object.assign(this, props);
  }

  getId(): number {
    return this.courseId;
  }

  get properties(): CourseProps {
    return {
      courseId: this.courseId,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: CoursePropsUpdate) {
    Object.assign(this, props);
  }

  delete() {
    this.deletedAt = new Date();
  }
}
