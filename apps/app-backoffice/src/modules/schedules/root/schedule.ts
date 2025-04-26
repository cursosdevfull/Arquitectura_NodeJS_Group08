import { Course } from "../course";

export class Schedule {
  private readonly scheduleId: number | undefined;
  private course: Course;
  private syllabus: string[];
  private slogan: string;
  private summary: string;
  private image: string;
  private description: string;
  private startDate: Date;
  private frequency: string;
  private duration: number;
  private price: number;
  private enabled: boolean;

  constructor(
    scheduleId: number,
    course: Course,
    syllabus: string[],
    slogan: string,
    summary: string,
    image: string,
    description: string,
    startDate: Date,
    frequency: string,
    duration: number,
    price: number,
    enabled: boolean,
  ) {
    if (startDate < new Date()) {
      throw new Error("Start date cannot be in the past.");
    }
    if (duration <= 0) {
      throw new Error("Duration must be greater than zero.");
    }
    if (price <= 0) {
      throw new Error("Price must be greater than zero.");
    }
    if (!slogan || slogan.length < 10) {
      throw new Error("Slogan must be at least 10 characters long.");
    }
    if (!summary || summary.length < 20) {
      throw new Error("Summary must be at least 20 characters long.");
    }
    if (!image || !image.startsWith("http")) {
      throw new Error("Image must be a valid URL.");
    }
    if (!description || description.length < 50) {
      throw new Error("Description must be at least 50 characters long.");
    }
    if (!frequency || summary.length < 10) {
      throw new Error("Frequency must be at least 10 characters long.");
    }
    if (!syllabus || syllabus.length === 0) {
      throw new Error("Syllabus must contain at least one item.");
    }
    if (!course) {
      throw new Error("Course cannot be null or undefined.");
    }
    if (!course.courseId || !course.title) {
      throw new Error("Course must have a valid ID and title.");
    }

    this.scheduleId = scheduleId;
    this.course = course;
    this.syllabus = syllabus;
    this.slogan = slogan;
    this.summary = summary;
    this.image = image;
    this.description = description;
    this.startDate = startDate;
    this.frequency = frequency;
    this.duration = duration;
    this.price = price;
    this.enabled = enabled ?? true;
  }

  properties() {
    return {
      scheduleId: this.scheduleId,
      course: this.course,
      syllabus: this.syllabus,
      slogan: this.slogan,
      summary: this.summary,
      image: this.image,
      description: this.description,
      startDate: this.startDate,
      frequency: this.frequency,
      duration: this.duration,
      price: this.price,
    };
  }

  delete() {
    this.enabled = false;
  }

  update(
    course: Course,
    syllabus: string[],
    slogan: string,
    summary: string,
    image: string,
    description: string,
    startDate: Date,
    frequency: string,
    duration: number,
    price: number,
  ) {
    this.course = course;
    this.syllabus = syllabus;
    this.slogan = slogan;
    this.summary = summary;
    this.image = image;
    this.description = description;
    this.startDate = startDate;
    this.frequency = frequency;
    this.duration = duration;
    this.price = price;
  }
}
