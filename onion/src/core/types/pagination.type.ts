export type Pagination<T> = {
    page: number;
    limit: number;
    total: number;
    items: T[];
};