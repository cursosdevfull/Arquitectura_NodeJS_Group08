import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { DatabaseService } from "./modules/database/database.service";

@Controller("report")
export class ReportController {
    constructor(private readonly service: AppService, private readonly database: DatabaseService) {}

    @Get("top-products")
    async getTopProducts() {
        const dbName = this.database.getDatabaseName()
        console.log("Database name: ", dbName)
        const monitoring = this.database.getMonitoring()
        console.log("Monitoring: ", monitoring)
        const dbType = this.database.getDatabaseType()
        console.log("Database type: ", dbType)


        const products = await this.service.getAll()
        products.sort((a, b) => b.price - a.price).slice(0, 20)
        return products
    }
}