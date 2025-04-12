import { Inject } from "@nestjs/common";

export class DatabaseService {
    constructor(@Inject("DATABASE") private readonly database: Record<string, any>) {}

    getDatabaseName() {
        return this.database.database
    }

    getMonitoring() {
        return this.database.monitoring
    }

    getDatabaseType() {
        return this.database.databaseType
    }
}