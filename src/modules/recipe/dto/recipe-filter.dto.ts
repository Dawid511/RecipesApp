import { IsEnum, IsOptional } from 'class-validator';

export class RecipeFilterDto {
  @IsOptional()
  @IsEnum(['difficulty', 'timeToMake'])
  sortBy?: string = 'difficulty';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
