import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [RatingService],
  controllers: [RatingController],
  imports: [PrismaModule],
})
export class RatingModule {}
