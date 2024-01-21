import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RateFilterDto } from './dto/rate-filter.dto';
import { CreateRateDto } from './dto/create-rate.dto';

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
}
