import { NotFoundException } from '@nestjs/common';

export class RatingNotfoundException extends NotFoundException {
  constructor() {
    super('Rating not found');
  }
}
