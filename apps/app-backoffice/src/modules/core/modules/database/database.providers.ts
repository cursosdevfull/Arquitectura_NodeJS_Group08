import * as path from "path";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async (cs: ConfigService) => {
      const dataSource = new DataSource({
        type: "mysql",
        host: cs.get("DB_HOST"),
        port: Number(cs.get("DB_PORT")),
        username: cs.get("DB_USER"),
        password: cs.get("DB_PASS"),
        database: cs.get("DB_NAME"),
        synchronize: cs.get("DB_SYNC") === "true",
        logging: cs.get("DB_LOGG") === "true",
        entities: [
          path.join(
            __dirname,
            "../../..",
            "**",
            "adapters/models/*.entity{.ts,.js}",
          ),
        ],
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
