import { Page } from "../types/page.type"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export abstract class BaseAdapter<T extends { properties: () => any }> {
    protected data: T[] = []

    constructor(private readonly nameId: string) {}

    create(item: T): Promise<T | null> {
        this.data.push(item)
        return Promise.resolve(item)
    }

    update(item: T): Promise<T | null> {
        const id = item.properties()[this.nameId]
        const index = this.data.findIndex((t) => t.properties()[this.nameId] === id);
        if (index === -1) return Promise.resolve(null);
        this.data[index] = item;
        return Promise.resolve(item);
    }

    delete(id: number): Promise<T | null> {
        const index = this.data.findIndex((t) => t.properties()[this.nameId] === id);
        if (index === -1) return Promise.resolve(null);
        const deleted = this.data.splice(index, 1)[0];
        return Promise.resolve(deleted);
    }

    getOne(id: number): Promise<T | null> {
        const item = this.data.find((t) => t.properties()[this.nameId] === id);
        return Promise.resolve(item || null);
    }

    getAll(): Promise<T[]> {
        return Promise.resolve([...this.data])
    }

    getByPage(page: number, limit: number): Promise<Page<T>> {
        const start = (page - 1) * limit
        const end = start + limit
        const data = this.data.slice(start, end)
        const total = this.data.length
        return Promise.resolve({ data, total, page, limit })
    }

}