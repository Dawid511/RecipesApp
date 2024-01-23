import { CreateRateDto } from './create-rate.dto';
import { IsInt, IsOptional } from 'class-validator';
export class EditRateDto extends CreateRateDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  recipeId: number;
}
