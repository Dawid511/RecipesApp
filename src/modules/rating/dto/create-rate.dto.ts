import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRateDto {
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  recipeId: number;
}
