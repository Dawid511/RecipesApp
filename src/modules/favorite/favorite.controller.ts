import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavFilterDto } from './dto/fav-filter.dto';
import { CreateFavDto } from './dto/fav-create.dto';
import { DeleteFavDto } from './dto/fav-delete.dto';
import { RatingNotfoundException } from '../../exceptions/rating-notfound-exception';

@Controller('fav')
export class FavoriteController {
  constructor(private favouriteService: FavoriteService) {}

  @Get()
  showRating(@Query() filter: FavFilterDto) {
    return this.favouriteService.showFav(filter);
  }

  @Post()
  addRating(@Body() data: CreateFavDto) {
    return this.favouriteService.createFav(data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Query() id: DeleteFavDto) {
    const rating = await this.favouriteService.getFav(id);
    if (!rating) throw new RatingNotfoundException();

    await this.favouriteService.deleteFav(id);
  }
}
