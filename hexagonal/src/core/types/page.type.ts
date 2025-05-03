export type Page<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
}