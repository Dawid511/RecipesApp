import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentFilterDto } from './dto/comment-filter.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentNotfoundException } from '../../exceptions/comment-notfound-exception';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  showComment(@Query() filter: CommentFilterDto) {
    return this.commentService.showComment(filter);
  }

  @Post()
  addComment(@Body() data: CreateCommentDto) {
    return this.commentService.createComment(data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.getComment(id);
    if (!comment) throw new CommentNotfoundException();

    await this.commentService.deleteComment(id);
  }
}
