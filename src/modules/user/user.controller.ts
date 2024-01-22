import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';
import { RecipeNotfoundException } from '../../exceptions/recipe-notfound-exception';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return plainToInstance(UserDto, user);
  }
  @Get('/me')
  @UseGuards(TokenGuard)
  async me(@UserID() userId: number) {
    const user = await this.userService.findOne(userId);
    return plainToInstance(UserDto, user);
  }
  // @Get(':id')
  // async getUser(@Param('id', ParseIntPipe) id: number) {
  //   const user = await this.userService.getUser(id);
  //   if (!user) throw new RecipeNotfoundException();
  //   return user;
  // }  // do komentarzy potrzebne, ale cos nie tak chyba
}
