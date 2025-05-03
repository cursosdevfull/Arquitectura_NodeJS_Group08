import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { CourseProps } from "../../domain/course";
import { Review } from "../../domain/entities/review";
import { Type } from "class-transformer";
import { Level } from "../../abstracts/level.enum";

export class CourseCreateDto implements CourseProps {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    requirements: string[];

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    duration: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    price: number;

    @IsNotEmpty()
    @IsEnum(Level)
    level: Level;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)    
    syllabus: string[];

    @IsNotEmpty()
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


