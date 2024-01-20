import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesService } from './modules/categories/categories.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { RatingModule } from './modules/rating/rating.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecipeModule,
    PrismaModule,
    TokenModule,
    UserModule,
    AuthModule,
    CategoriesModule,
    RatingModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}
