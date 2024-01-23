import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeNotfoundException } from '../../exceptions/recipe-notfound-exception';
import { EditRecipeDto } from './dto/edit-recipe.dto';
import { RecipeFilterDto } from './dto/recipe-filter.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('/user')
  showRecipeForUser(@Query() filter: RecipeFilterDto) {
    return this.recipeService.showRecipeForUser(filter);
  }

  @Get('/fav')
  showRating(@Query('userId', new ParseIntPipe()) userId: number) {
    return this.recipeService.findUserFavorites(userId);
  }

  @Get()
  showRecipe(@Query() filter: RecipeFilterDto) {
    return this.recipeService.showRecipe(filter);
  }

  // @Get('/test') // kolejnosc ma znazenie zczytywanie od gory
  // test(@Query() filter: RecipeFilterDto) {
  //   return filter;
  // }
  @Get(':id')
  async getRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipeService.getRecipe(id);
    if (!recipe) throw new RecipeNotfoundException();
    return recipe;
  }

  @Post()
  addRecipe(@Body() data: CreateRecipeDto) {
    return this.recipeService.createRecipe(data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipeService.getRecipe(id);
    if (!recipe) throw new RecipeNotfoundException();

    await this.recipeService.deleteRecipe(id);
  }

  @Put(':id')
  async editRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditRecipeDto,
  ) {
    const recipe = await this.recipeService.getRecipe(id);
    if (!recipe) throw new RecipeNotfoundException();
    return this.recipeService.editRecipe(id, data);
  }
}
