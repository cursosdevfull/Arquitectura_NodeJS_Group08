import { Level } from "../abstracts/level.enum";
import { Review } from "./entities/review";

export type CoursePropsRequired = {
    name: string;
    description: string;
    requirements: string[];
    duration: number; // in hours
    price: number; // in USD
    level: Level; // beginner, intermediate, advanced   
    syllabus: string[]; // list of topics covered in the course
    instructor: string; // name of the instructor
}

export type CoursePropsOptional = {
    courseId?: number;
    rating?: number; // average rating out of 5
    reviews?: Review[]; // list of reviews from students 
}

export type CourseProps = CoursePropsRequired & CoursePropsOptional;

export type CoursePropsUpdate = Partial<CoursePropsRequired & Omit<CoursePropsOptional, 'courseId'>>

export class Course {
    private readonly courseId: number;
    private name: string;
    private description: string;
    private requirements: string[];
    private duration: number; // in hours
    private price: number; // in USD
    private level: Level; // beginner, intermediate, advanced
    private syllabus: string[]; // list of topics covered in the course
    private instructor: string; // name of the instructor
    private rating: number; // average rating out of 5
    private reviews: Review[]; // list of reviews from students 


    constructor(props: CourseProps) {
        Object.assign(this, props);
    }

    get properties() {
        return {
            courseId: this.courseId,
            name: this.name,
            description: this.description,
            requirements: this.requirements,
            duration: this.duration,
            price: this.price,
            level: this.level,
            syllabus: this.syllabus,
            instructor: this.instructor,
            rating: this.rating,
            reviews: this.reviews
        };
    }

    update(props: CoursePropsUpdate) {
        Object.assign(this, props);
    }
}