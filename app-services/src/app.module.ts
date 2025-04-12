import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ReportController } from "./report.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./modules/database/database.module";

@Module({
    imports: [DatabaseModule.forRoot("MYSQL", true)],
    controllers: [AppController, ReportController],
    providers: [
        AppService,

        /* {
            provide: AppService,
            useClass: AppService
        } */
    ]
})
export class AppModule {}