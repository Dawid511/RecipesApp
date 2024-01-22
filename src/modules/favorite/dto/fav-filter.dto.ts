import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FavFilterDto {
  @IsNumber()
  @Type(() => Number)
  userId?: number;
}
