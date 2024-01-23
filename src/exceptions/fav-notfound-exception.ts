import { NotFoundException } from '@nestjs/common';

export class FavNotfoundException extends NotFoundException {
  constructor() {
    super('Favourite not found');
  }
}
