import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";

export type DatabaseType = "MYSQL" | "POSTGRES";

export const DatabasePort:Record<DatabaseType, number> = {
    MYSQL: 3306,
    POSTGRES: 5432,
}

export const DatabaseUsername: Record<DatabaseType, string> = {
    MYSQL: "mysql",
    POSTGRES: "postgres",
}

@Module({})
export class DatabaseModule {
    static forRoot(databaseType: DatabaseType, monitoring: boolean) {
        return {
            module: DatabaseModule,
            providers: [
                DatabaseService,
                {
                    provide: "DATABASE",
                    useFactory: async () => {
                        return {
                            host: "localhost",
                            port: DatabasePort[databaseType],
                            username: DatabaseUsername[databaseType],
                            password: "admin",
                            database: "products",
                            databaseType: databaseType,
                            monitoring,
                        }
                    }
                },
            ],
            exports: ["DATABASE", DatabaseService]
        }
    }
}