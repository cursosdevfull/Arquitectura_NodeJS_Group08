import { Controller, Delete, Get, Inject, Post, Put } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("product")
export class AppController {
    constructor(private readonly service: AppService,/*  @Inject("MONITORING") private readonly monitoring: boolean */) {}

    @Get()
    async getProducts() {
        //this.monitoring ? console.log("Monitoring is enabled") : console.log("Monitoring is disabled")
        return await this.service.getAll()
    }

    @Get(":id")
    async getProduct() {
        const id= 15
        return await this.service.getById(id)
    }

    @Post()
    async createProduct(){
        const ids = (await this.service.getAll()).map(product => product.id)
        const maxId = Math.max(...ids)+1

        await this.service.create(maxId, "Product " + maxId, Math.floor(Math.random() * 50) * 100)
        return { message: "Product created successfully" }
    }

    @Put(":id")
    async updateProduct() {
        const id = 15
        const newPrice = Math.floor(Math.random() * 50) *100
        const product = { name: "Updated Product", price: newPrice }

        const productFound = await this.service.getById(id)
        if (!productFound) {
            return { message: "Product not found" }
        }

        await this.service.update(id, product.name, product.price)
        return { message: "Product updated successfully" }
    }

    @Delete(":id")
    async deleteProduct() {
        const id = 15

        const productFound = await this.service.getById(id)
        if (!productFound) {
            return { message: "Product not found" }
        }

        await this.service.delete(id)
        return { message: "Product deleted successfully" }
    }

    @Get("page/:page/size/:size")
    async getProductsByPage() {
        const page = 0;
        const size = 10;
        return await this.service.getProductsByPage(page, size)
    }

}