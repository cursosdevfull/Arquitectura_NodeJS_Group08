import { RoleProps } from "@roles/application";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RoleCreateDto implements Omit<RoleProps, "roleId"> {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  actions: string;
}
