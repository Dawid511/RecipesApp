import { NotFoundException } from '@nestjs/common';

export class RecipeNotfoundException extends NotFoundException {
  constructor() {
    super('Recipe not found');
  }
}
