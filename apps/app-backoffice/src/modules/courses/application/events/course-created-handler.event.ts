import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CourseCreatedEvent } from "./course-created.event";

@EventsHandler(CourseCreatedEvent)
export class CourseCreatedHandlerEvent
  implements IEventHandler<CourseCreatedEvent>
{
  handle(event: CourseCreatedEvent) {
    const { name } = event;
    console.log(`Course created: ${name}`);
  }
}
