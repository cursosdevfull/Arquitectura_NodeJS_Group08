import { DatabaseService } from "./database.service";
export declare class DatabaseModule {
    static forRoot(databaseType: "MYSQL" | "POSTGRES", monitoring: boolean): {
        module: typeof DatabaseModule;
        providers: (typeof DatabaseService | {
            provide: string;
            useFactory: () => Promise<{
                host: string;
                port: number;
                username: string;
                password: string;
                database: string;
                databaseType: "MYSQL" | "POSTGRES";
                monitoring: boolean;
            }>;
        })[];
        exports: (string | typeof DatabaseService)[];
    };
}
