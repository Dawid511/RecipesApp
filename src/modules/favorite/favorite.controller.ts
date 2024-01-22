import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavFilterDto } from './dto/fav-filter.dto';
import { CreateFavDto } from './dto/fav-create.dto';

@Controller('fav')
export class FavoriteController {
  constructor(private favouriteService: FavoriteService) {}

  @Get()
  showRating(@Query() filter: FavFilterDto) {
    return this.favouriteService.showFavourites(filter);
  }

  @Post()
  addRating(@Body() data: CreateFavDto) {
    return this.favouriteService.createFav(data);
  }
}
