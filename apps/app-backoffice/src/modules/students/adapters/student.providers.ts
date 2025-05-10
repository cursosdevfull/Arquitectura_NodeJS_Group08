import { DataSource } from "typeorm";
import { StudentEntity } from "./models";

export const studentProviders = [
  {
    provide: "STUDENT_REPOSITORY",
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(StudentEntity);
    },
    inject: ["DATA_SOURCE"],
  },
];
