import { AppService } from "./app.service";
export declare class AppController {
    private readonly service;
    constructor(service: AppService);
    getProducts(): Promise<{
        id: number;
        name: string;
        price: number;
    }[]>;
    getProduct(): Promise<{
        id: number;
        name: string;
        price: number;
    } | undefined>;
    createProduct(): Promise<{
        message: string;
    }>;
    updateProduct(): Promise<{
        message: string;
    }>;
    deleteProduct(): Promise<{
        message: string;
    }>;
    getProductsByPage(): Promise<{
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
