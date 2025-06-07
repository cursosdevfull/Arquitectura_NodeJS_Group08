import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function enablePipes(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    }),
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function enableSecurity(app: INestApplication<any>) {
  app.enableCors({ origin: "http://localhost:9000" });
  app.use(helmet());
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function enableVersioning(app: INestApplication<any>) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function enableSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle("Backoffice API")
    .setDescription("API documentation for the Backoffice application")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });
}
