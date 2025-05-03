import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class PaginationDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)    
    limit: number

    constructor(){
        console.log("PaginationDto constructor")
    }
}