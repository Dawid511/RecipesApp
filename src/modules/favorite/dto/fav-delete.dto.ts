import { IsInt } from 'class-validator';

export class DeleteFavDto {
  @IsInt()
  userId: number;

  @IsInt()
  recipeId: number;
}
