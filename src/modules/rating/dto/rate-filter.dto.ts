import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class RateFilterDto {
  @IsNumber()
  @Type(() => Number)
  recipeId?: number;
}
