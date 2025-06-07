import { INestApplication } from "@nestjs/common";

export class GlobalService {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  static instance: INestApplication<any>;
}
