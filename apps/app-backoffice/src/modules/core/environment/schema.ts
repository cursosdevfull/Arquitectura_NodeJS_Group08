import { parseEnv, z } from "znv";

export const environmentSchema = () =>
  parseEnv(process.env, {
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3310),
    DB_USER: z.string().default("user"),
    DB_PASS: z.string().default("12345"),
    DB_NAME: z.string().default("backoffice"),
    DB_SYNC: z.string().default("false"),
    DB_LOGG: z.string().default("false"),
    ACCESS_TOKEN_SECRET: z.string().default("defaultSecret"),
    ACCESS_TOKEN_EXPIRATION_IN: z.coerce.string().default("5h"),
    REFRESH_TOKEN_SECRET: z.string().default("defaultSecret"),
    REFRESH_TOKEN_EXPIRATION_IN: z.coerce.string().default("30d"),
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.coerce.number().default(6380),
    REDIS_PASS: z.string().default("12345"),
    REDIS_TTL_IN_MINUTES: z.coerce.number().default(10),
  });
