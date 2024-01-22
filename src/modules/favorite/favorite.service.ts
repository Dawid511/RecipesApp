import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavDto } from './dto/fav-create.dto';
import { FavFilterDto } from './dto/fav-filter.dto';
import { DeleteFavDto } from './dto/fav-delete.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async createFav(data: CreateFavDto) {
    const existingFav = await this.prisma.favoriteRecipes.findFirst({
      where: {
        userId: data.userId,
      },
    });

    if (existingFav) {
      throw new Error('User has already added this recipe to his favourites');
    }

    return this.prisma.favoriteRecipes.create({
      data: {
        userId: data.userId,
        recipeId: data.recipeId,
      },
    });
  }

  async showFav(filter: FavFilterDto) {
    const fav = await this.prisma.favoriteRecipes.findMany({
      where: {
        userId: filter.userId,
      },
      select: {
        recipeId: true, // Select only the recipeId field
      },
    });
    if (fav.length === 0) {
      return [];
    }

    return fav.map((fav) => fav.recipeId);
  }

  async deleteFav(data: DeleteFavDto) {
    return this.prisma.favoriteRecipes.delete({
      where: {
        userId_recipeId: {
          userId: data.userId,
          recipeId: data.recipeId,
        },
      },
    });
  }

  getFav(data: DeleteFavDto) {
    return this.prisma.favoriteRecipes.findUnique({
      where: {
        userId_recipeId: {
          userId: data.userId,
          recipeId: data.recipeId,
        },
      },
    });
  }
}
