import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  ingredients: string;

  @IsString()
  @IsNotEmpty()
  steps: string;

  @IsNumber()
  @IsNotEmpty()
  difficulty: number;

  @IsNumber()
  @IsNotEmpty()
  timeToMake: number;

  @IsNumber()
  authorId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
