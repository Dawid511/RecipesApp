import { NotFoundException } from '@nestjs/common';

export class CommentNotfoundException extends NotFoundException {
  constructor() {
    super('Comment not found');
  }
}
