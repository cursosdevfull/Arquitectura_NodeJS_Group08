import { AuthModule } from "@auth/presentation";
import { environmentSchema } from "@core/environment";
import { CourseModule } from "@courses/presentation";
import { createKeyv } from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { RoleModule } from "@roles/presentation";
import { StudentModule } from "@students/presentation";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentSchema],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 30,
        },
      ],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (cs: ConfigService) => ({
        stores: [
          createKeyv(
            {
              url: `redis://:${cs.get("REDIS_PASS")}@${cs.get("REDIS_HOST")}:${cs.get("REDIS_PORT")}`,
            },
            { namespace: "data" },
          ),
          createKeyv(
            {
              url: `redis://:${cs.get("REDIS_PASS")}@${cs.get("REDIS_HOST")}:${cs.get("REDIS_PORT")}`,
            },
            { namespace: "audit" },
          ),
        ],
      }),
      inject: [ConfigService],
    }),
    CqrsModule.forRoot(),
    StudentModule,
    AuthModule,
    RoleModule,
    CourseModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
