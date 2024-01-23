import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class RecipeFilterDto {
  @IsOptional()
  @IsEnum(['difficulty', 'timeToMake'])
  sortBy?: string = 'difficulty';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number; //

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  authorId?: number;
}
