import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";
import { Observable, catchError, from, of, switchMap, tap } from "rxjs";

@Injectable()
export class CacheableInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheableInterceptor.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  intercept(
    context: ExecutionContext,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    next: CallHandler<any>,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ): Observable<any> {
    const cacheKey = this.getCacheKey(context);

    return from(this.cacheManager.get(cacheKey)).pipe(
      catchError((err) => {
        this.logger.error(`Cache error for key ${cacheKey}: ${err.message}`);
        return of(null);
      }),
      switchMap((cachedResponse) => {
        if (cachedResponse) {
          this.logger.log(`Cache hit for key: ${cacheKey}`);
          return of(cachedResponse);
        }

        return next.handle().pipe(
          switchMap((response) => {
            return from(
              this.cacheManager.stores[0].set(
                cacheKey,
                response,
                this.configService.get("REDIS_TTL_IN_MINUTES") * 60 * 1000,
              ),
            ).pipe(
              tap(() => this.logger.log(`Cache set for key: ${cacheKey}`)),
              catchError((err) => {
                this.logger.error(
                  `Failed to set cache for key ${cacheKey}: ${err.message}`,
                );
                return of(null);
              }),
              switchMap(() => of(response)),
            );
          }),
        );
      }),
    );
  }

  private getCacheKey(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { url, method, body, params, query } = request;

    let tailKey = "";

    if (body && Object.keys(body).length > 0) {
      for (const key in body) {
        tailKey += `${key}_${body[key]}_`;
      }
    }

    if (params && Object.keys(params).length > 0) {
      for (const key in params) {
        tailKey += `${key}_${params[key]}_`;
      }
    }

    if (query && Object.keys(query).length > 0) {
      for (const key in query) {
        tailKey += `${key}_${query[key]}_`;
      }
    }

    return `${method}_${url.replace(/\\/, "")}_${tailKey}`;
  }
}
