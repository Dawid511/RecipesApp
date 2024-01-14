import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async showRecipe() {
    return this.prisma.recipe.findMany({});
  }

  // async addRecipe(data: CreateRecipeDto) {
  //   return this.prisma.recipe.create({
  //     data: {
  //       title: data.title,
  //       description: data.description,
  //       ingredients: data.ingredients,
  //       steps: data.steps,
  //       difficulty: data.difficulty,
  //       timeToMake: data.timeToMake,
  //       authorId: data.authorId,
  //       categories: {
  //         connect: {
  //           categoryId: data.categoryIds,
  //         },
  //       },
  //     },
  //   });
  // }

  async createRecipe(data: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description,
        ingredients: data.ingredients,
        steps: data.steps,
        difficulty: data.difficulty,
        timeToMake: data.timeToMake,
        authorId: data.authorId,
        categories: {
          create: [{ category: { create: { name: 'new' } } }],
        },
      },
    });
  }

  editRecipe() {}

  deleteRecipe() {}
}
