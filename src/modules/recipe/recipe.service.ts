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
        authorId: filter.userId,
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

// async getRecipesByIds(recipeIds: number[]): Promise<RecipeDto[]> {
//   return this.prisma.recipe.findMany({
//     where: {
//       id: {
//         in: recipeIds, // Użyj operatora IN, aby wybrać wszystkie przepisy o podanych ID
//       },
//     },
//     // Tutaj dodaj selekcję pól, które chcesz zwrócić
//   });
// }
//
// async findUserFavorites(id: number): Promise<RecipeDto[]> {
//   // Pobierz wszystkie ID przepisów ulubionych przez użytkownika
//   const favoriteRecipeIds = await this.prisma.favoriteRecipes.findMany({
//     where: { userId: id },
//     select: { recipeId: true }, // Zwróć tylko ID przepisów
//   });
//
//   // Zamień tablicę obiektów na tablicę samych ID
//   const recipeIds = favoriteRecipeIds.map((fav) => fav.recipeId);
//
//   // Użyj RecipeService do pobrania pełnych danych przepisów
//   // Zakładając, że RecipeService ma metodę getRecipesByIds, która przyjmuje tablicę ID i zwraca Promise<RecipeDto[]>
//   const recipes = await this.getRecipesByIds(recipeIds);
//
//   return recipes;
// }
// }
