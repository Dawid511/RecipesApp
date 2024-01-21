import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentFilterDto } from './dto/comment-filter.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

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
}
