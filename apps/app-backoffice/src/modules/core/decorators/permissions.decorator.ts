import { SetMetadata } from "@nestjs/common";

export const Permisions = (...args: string[]) =>
  SetMetadata("permissions", args);
