import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EditRecipeDto } from './dto/edit-recipe.dto';
import { RecipeFilterDto } from './dto/recipe-filter.dto';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async showRecipe(filter: RecipeFilterDto) {
    return this.prisma.recipe.findMany({
      where: {
        categor: {
          some: {
            categoryId: filter.categoryId,
          },
        },
      }, // do filtrow
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }

  async showRecipeForUser(filter: RecipeFilterDto) {
    return this.prisma.recipe.findMany({
      where: {
        authorId: filter.authorId,
      }, // do filtrow
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }

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
        categor: {
          create: data.categoryIds.map((catId) => ({
            catego: { connect: { id: catId } },
          })),
        },
      },
    });
  }

  //editRecipe() {}

  async deleteRecipe(id: number) {
    await this.prisma.recipeCategory.deleteMany({
      where: {
        recipeId: id,
      },
    });
    await this.prisma.comment.deleteMany({
      where: {
        recipeId: id,
      },
    });
    await this.prisma.rating.deleteMany({
      where: {
        recipeId: id,
      },
    });
    await this.prisma.favoriteRecipes.deleteMany({
      where: {
        recipeId: id,
      },
    });
    return this.prisma.recipe.delete({
      where: {
        id,
      },
    });
  }

  getRecipe(id: number) {
    return this.prisma.recipe.findUnique({
      where: {
        id,
      },
    });
  }

  editRecipe(id: number, data: EditRecipeDto) {
    return this.prisma.recipe.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        ingredients: data.ingredients,
        steps: data.steps,
        difficulty: data.difficulty,
        timeToMake: data.timeToMake,
        authorId: data.authorId,
        categor: {
          create: data.categoryIds.map((catId) => ({
            catego: { connect: { id: catId } },
          })),
        },
      },
    });
  }
  async findUserFavorites(userId: number): Promise<RecipeDto[]> {
    const favoriteRecipeIds = await this.prisma.favoriteRecipes.findMany({
      where: { userId },
      select: { recipeId: true },
    });

    const recipeIds = favoriteRecipeIds.map((fav) => fav.recipeId);
    return this.getRecipesByIds(recipeIds);
  }

  async getRecipesByIds(recipeIds: number[]): Promise<RecipeDto[]> {
    return this.prisma.recipe.findMany({
      where: {
        id: { in: recipeIds },
      },
      // Include other fields as needed
    });
  }
}
