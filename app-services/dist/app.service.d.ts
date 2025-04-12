export declare class AppService {
    private readonly products;
    getAll(): Promise<{
        id: number;
        name: string;
        price: number;
    }[]>;
    getById(id: number): Promise<{
        id: number;
        name: string;
        price: number;
    } | undefined>;
    create(id: number, name: string, price: number): Promise<{
        message: string;
    }>;
    update(id: number, name: string, price: number): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
    getProductsByPage(page: number, size: number): Promise<{
        page: number;
        size: number;
        totalProducts: number;
        products: {
            id: number;
            name: string;
            price: number;
        }[];
    }>;
}
