"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getProducts() {
        return await this.service.getAll();
    }
    async getProduct() {
        const id = 15;
        return await this.service.getById(id);
    }
    async createProduct() {
        const ids = (await this.service.getAll()).map(product => product.id);
        const maxId = Math.max(...ids) + 1;
        await this.service.create(maxId, "Product " + maxId, Math.floor(Math.random() * 50) * 100);
        return { message: "Product created successfully" };
    }
    async updateProduct() {
        const id = 15;
        const newPrice = Math.floor(Math.random() * 50) * 100;
        const product = { name: "Updated Product", price: newPrice };
        const productFound = await this.service.getById(id);
        if (!productFound) {
            return { message: "Product not found" };
        }
        await this.service.update(id, product.name, product.price);
        return { message: "Product updated successfully" };
    }
    async deleteProduct() {
        const id = 15;
        const productFound = await this.service.getById(id);
        if (!productFound) {
            return { message: "Product not found" };
        }
        await this.service.delete(id);
        return { message: "Product deleted successfully" };
    }
    async getProductsByPage() {
        const page = 0;
        const size = 10;
        return await this.service.getProductsByPage(page, size);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Put)(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)("page/:page/size/:size"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProductsByPage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)("product"),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map