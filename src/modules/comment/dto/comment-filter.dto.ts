import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CommentFilterDto {
  @IsOptional()
  @IsEnum(['createdAt'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  // @IsOptional() // nie ma sensu pobierac wszystkie komentarze
  @IsNumber()
  @Type(() => Number)
  recipeId?: number;
}
