import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { RateFilterDto } from './dto/rate-filter.dto';
import { CreateRateDto } from './dto/create-rate.dto';
import { EditRateDto } from './dto/rate-edit.dto';
import { RateNotfoundException } from '../../exceptions/rate-notfound-exception';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get()
  showRating(@Query() filter: RateFilterDto) {
    return this.ratingService.showRating(filter);
  }

  @Post()
  addRating(@Body() data: CreateRateDto) {
    return this.ratingService.createRate(data);
  }

  @Put(':id')
  async editRate(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditRateDto,
  ) {
    const rate = await this.ratingService.getRate(id);
    if (!rate) throw new RateNotfoundException();
    return this.ratingService.editRate(id, data);
  }
}
