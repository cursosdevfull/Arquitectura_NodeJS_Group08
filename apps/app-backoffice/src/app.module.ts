import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "@students/presentation";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
