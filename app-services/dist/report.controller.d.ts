import { AppService } from "./app.service";
import { DatabaseService } from "./modules/database/database.service";
export declare class ReportController {
    private readonly service;
    private readonly database;
    constructor(service: AppService, database: DatabaseService);
    getTopProducts(): Promise<{
        id: number;
        name: string;
        price: number;
    }[]>;
}
