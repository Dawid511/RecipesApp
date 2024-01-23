import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteFavDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  recipeId: number;
}
