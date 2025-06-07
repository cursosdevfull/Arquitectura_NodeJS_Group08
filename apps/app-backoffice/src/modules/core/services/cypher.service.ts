import * as crypto from "crypto";

export class CypherService {
  private static readonly iterations = 10000;
  private static readonly keylen = 64;
  private static readonly digest = "sha512";

  static async hash(text: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex");

    return new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(
        text,
        salt,
        CypherService.iterations,
        CypherService.keylen,
        CypherService.digest,
        (err, derivedKey) => {
          if (err) {
            reject(err);
          } else {
            resolve(
              `${CypherService.iterations}:${salt}:${derivedKey.toString("hex")}`,
            );
          }
        },
      );
    });
  }

  static async verify(text: string, storeHash: string): Promise<boolean> {
    const [iterations, salt, hash] = storeHash.split(":");
    const iterCount = Number.parseInt(iterations, 10);

    return new Promise<boolean>((resolve, reject) => {
      crypto.pbkdf2(
        text,
        salt,
        iterCount,
        CypherService.keylen,
        CypherService.digest,
        (err, derivedKey) => {
          if (err) reject(err);
          resolve(crypto.timingSafeEqual(Buffer.from(hash, "hex"), derivedKey));
        },
      );
    });
  }
}
