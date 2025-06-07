import { DatabaseModule } from "@core/modules/database/database.module";
import { Module } from "@nestjs/common";
import { RoleAdapter } from "@roles/adapters";
import { roleProviders } from "@roles/adapters/role.providers";
import { RoleApplication } from "@roles/application";
import { RoleController } from "./role.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleApplication, RoleAdapter, ...roleProviders],
})
export class RoleModule {}
