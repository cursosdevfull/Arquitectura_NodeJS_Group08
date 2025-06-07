import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StudentCreatedEvent } from "./student-created.event";

@EventsHandler(StudentCreatedEvent)
export class StudentCreatedHandlerEvent
  implements IEventHandler<StudentCreatedEvent>
{
  handle(event: StudentCreatedEvent) {
    console.log("Student Created Event Handled:", event);
    // Here you can add logic to handle the event, such as logging, sending notifications, etc.
    // For example, you might want to send a welcome email to the student.
  }
}
