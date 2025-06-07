import { GlobalService } from "@core/services";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  enablePipes,
  enableSecurity,
  enableSwagger,
  enableVersioning,
} from "./main.service";

async function bootstrap() {
  const log = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  enableVersioning(app);
  enableSwagger(app);
  enableSecurity(app);
  enablePipes(app);

  await app.listen(configService.get("PORT") as number, () =>
    log.log(`Server is running on port ${configService.get("PORT")}`),
  );
  GlobalService.instance = app;
}
bootstrap();
