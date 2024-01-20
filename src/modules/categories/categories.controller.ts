import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  showRecipe() {
    return this.categoriesService.showCategories();
  }

  @Post()
  addCategory(@Body() data: CreateCategoryDto) {
    return this.categoriesService.createRecipe(data);
  }
}
