import * as bcrypt from "bcryptjs";

export function crypt(text: string): Promise<string> {
  return bcrypt.hash(text, 10);
}
