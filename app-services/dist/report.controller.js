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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const database_service_1 = require("./modules/database/database.service");
let ReportController = class ReportController {
    service;
    database;
    constructor(service, database) {
        this.service = service;
        this.database = database;
    }
    async getTopProducts() {
        const dbName = this.database.getDatabaseName();
        console.log("Database name: ", dbName);
        const monitoring = this.database.getMonitoring();
        console.log("Monitoring: ", monitoring);
        const dbType = this.database.getDatabaseType();
        console.log("Database type: ", dbType);
        const products = await this.service.getAll();
        products.sort((a, b) => b.price - a.price).slice(0, 20);
        return products;
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)("top-products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getTopProducts", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)("report"),
    __metadata("design:paramtypes", [app_service_1.AppService, database_service_1.DatabaseService])
], ReportController);
//# sourceMappingURL=report.controller.js.map