import { IsNumber } from 'class-validator';

export class CreateFavDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  recipeId: number;
}
