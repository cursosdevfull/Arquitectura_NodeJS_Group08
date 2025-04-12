"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
class AppService {
    products = [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
        { id: 3, name: "Product 3", price: 300 },
        { id: 4, name: "Product 4", price: 400 },
        { id: 5, name: "Product 5", price: 500 },
        { id: 6, name: "Product 6", price: 600 },
        { id: 7, name: "Product 7", price: 700 },
        { id: 8, name: "Product 8", price: 800 },
        { id: 9, name: "Product 9", price: 900 },
        { id: 10, name: "Product 10", price: 1000 },
        { id: 11, name: "Product 11", price: 1100 },
        { id: 12, name: "Product 12", price: 1200 },
        { id: 13, name: "Product 13", price: 1300 },
        { id: 14, name: "Product 14", price: 1400 },
        { id: 15, name: "Product 15", price: 1500 },
        { id: 16, name: "Product 16", price: 1600 },
        { id: 17, name: "Product 17", price: 1700 },
        { id: 18, name: "Product 18", price: 1800 },
        { id: 19, name: "Product 19", price: 1900 },
        { id: 20, name: "Product 20", price: 2000 },
        { id: 21, name: "Product 21", price: 2100 },
        { id: 22, name: "Product 22", price: 2200 },
        { id: 23, name: "Product 23", price: 2300 },
        { id: 24, name: "Product 24", price: 2400 },
        { id: 25, name: "Product 25", price: 2500 },
        { id: 26, name: "Product 26", price: 2600 },
        { id: 27, name: "Product 27", price: 2700 },
        { id: 28, name: "Product 28", price: 2800 },
        { id: 29, name: "Product 29", price: 2900 },
        { id: 30, name: "Product 30", price: 3000 },
        { id: 31, name: "Product 31", price: 3100 },
        { id: 32, name: "Product 32", price: 3200 },
        { id: 33, name: "Product 33", price: 3300 },
        { id: 34, name: "Product 34", price: 3400 },
        { id: 35, name: "Product 35", price: 3500 },
        { id: 36, name: "Product 36", price: 3600 },
        { id: 37, name: "Product 37", price: 3700 },
        { id: 38, name: "Product 38", price: 3800 },
        { id: 39, name: "Product 39", price: 3900 },
        { id: 40, name: "Product 40", price: 4000 },
        { id: 41, name: "Product 41", price: 4100 },
        { id: 42, name: "Product 42", price: 4200 },
        { id: 43, name: "Product 43", price: 4300 },
        { id: 44, name: "Product 44", price: 4400 },
        { id: 45, name: "Product 45", price: 4500 },
        { id: 46, name: "Product 46", price: 4600 },
        { id: 47, name: "Product 47", price: 4700 },
        { id: 48, name: "Product 48", price: 4800 },
        { id: 49, name: "Product 49", price: 4900 },
        { id: 50, name: "Product 50", price: 5000 }
    ];
    async getAll() {
        return [...this.products];
    }
    async getById(id) {
        return this.products.find(product => product.id === id);
    }
    async create(id, name, price) {
        this.products.push({ id, name, price });
        return { message: "Product created successfully" };
    }
    async update(id, name, price) {
        const product = { name: "Updated Product", price: 100 * id };
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return { message: "Product not found" };
        }
        this.products[productIndex] = { ...this.products[productIndex], ...product };
        return { message: "Product updated successfully" };
    }
    async delete(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return { message: "Product not found" };
        }
        this.products.splice(productIndex, 1);
        return { message: "Product deleted successfully" };
    }
    async getProductsByPage(page, size) {
        const startIndex = page * size;
        const endIndex = startIndex + size;
        const paginatedProducts = this.products.slice(startIndex, endIndex);
        return {
            page: page,
            size: size,
            totalProducts: this.products.length,
            products: paginatedProducts
        };
    }
}
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map