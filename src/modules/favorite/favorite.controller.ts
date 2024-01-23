import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavFilterDto } from './dto/fav-filter.dto';
import { CreateFavDto } from './dto/fav-create.dto';
import { DeleteFavDto } from './dto/fav-delete.dto';
import { FavNotfoundException } from '../../exceptions/fav-notfound-exception';

@Controller('fav')
export class FavoriteController {
  constructor(private favouriteService: FavoriteService) {}

  @Get()
  showFav(@Query() filter: FavFilterDto) {
    return this.favouriteService.showFav(filter);
  }

  @Post()
  addFav(@Body() data: CreateFavDto) {
    return this.favouriteService.createFav(data);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFav(
    @Body(new ValidationPipe({ transform: true })) id: DeleteFavDto,
  ) {
    const fav = await this.favouriteService.getFav(id);
    if (!fav) throw new FavNotfoundException();

    await this.favouriteService.deleteFav(id);
  }
}
