import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { RateFilterDto } from './dto/rate-filter.dto';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async showRating(filter: RateFilterDto) {
    const ratings = await this.prisma.rating.findMany({
      where: {
        recipeId: filter.recipeId,
      },
    });
    if (ratings.length === 0) {
      return 0;
    }

    return ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;
  }

  async createRate(data: CreateRateDto) {
    const existingRating = await this.prisma.rating.findFirst({
      where: {
        userId: data.userId,
        recipeId: data.recipeId,
      },
    });

    if (existingRating) {
      throw new Error('User has already rated this recipe');
    }

    return this.prisma.rating.create({
      data: {
        value: data.rate,
        userId: data.userId,
        recipeId: data.recipeId,
      },
    });
  }
}
