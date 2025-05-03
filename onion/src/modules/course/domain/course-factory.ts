import { Course, CourseProps } from "./course";

export class CourseFactory {
    static create(props: CourseProps){
        if(props.name.length < 3) throw new Error("Course name must be at least 3 characters long.");
        if(props.description.length < 10) throw new Error("Course description must be at least 10 characters long.");
        if(props.requirements.length < 1) throw new Error("Course must have at least one requirement.");
        if(props.duration <= 0) throw new Error("Course duration must be greater than 0.");
        if(props.price <= 0) throw new Error("Course price must be greater than 0.");
        if(props.syllabus.length < 1) throw new Error("Course must have at least one syllabus topic.");
        if(props.instructor.length < 3) throw new Error("Instructor name must be at least 3 characters long.");
        if(props.rating && (props.rating < 0 || props.rating > 5)) throw new Error("Course rating must be between 0 and 5.");
        if(props.reviews && props.reviews.length < 1) throw new Error("Course must have at least one review.");
        
        return new Course(props);
    }
}