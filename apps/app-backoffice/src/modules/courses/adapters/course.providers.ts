import { DataSource } from "typeorm";
import { CourseEntity } from "./models";

export const courseProviders = [
  {
    provide: "COURSE_REPOSITORY",
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(CourseEntity);
    },
    inject: ["DATA_SOURCE"],
  },
];
