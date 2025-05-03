import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { CoursePropsUpdate } from "../../domain/course";
import { Review } from "../../domain/entities/review";
import { Type } from "class-transformer";
import { Level } from "../../abstracts/level.enum";

export class CourseUpdateDto implements CoursePropsUpdate {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(10)
    description: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    requirements: string[];

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    duration: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    price: number;

    @IsOptional()
    @IsEnum(Level)
    level: Level;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)    
    syllabus: string[];

    @IsOptional()
    @IsString()
    @MinLength(3)
    instructor: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(5)
    rating: number; 

    @IsOptional()
    @IsArray()
    @Type(() => Review)
    @ArrayMinSize(1)  
    reviews: Review[]; 
}


