import { StudentEntity } from "@students/adapters/models";
import { DataSource } from "typeorm";

export const authProviders = [
  {
    provide: "STUDENT_REPOSITORY",
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(StudentEntity);
    },
    inject: ["DATA_SOURCE"],
  },
];
