import { DataSource } from "typeorm";
import { RoleEntity } from "./models";

export const roleProviders = [
  {
    provide: "ROLE_REPOSITORY",
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(RoleEntity);
    },
    inject: ["DATA_SOURCE"],
  },
];
