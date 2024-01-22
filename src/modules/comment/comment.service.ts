import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CommentFilterDto } from './dto/comment-filter.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async showComment(filter: CommentFilterDto) {
    return this.prisma.comment.findMany({
      where: {
        recipeId: filter.recipeId,
      }, // do filtrow
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }

  async createComment(data: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: data.content,
        userId: data.authorId,
        recipeId: data.recipeId,
      },
    });
  }
  async deleteComment(id: number) {
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  getComment(id: number) {
    return this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }
}
