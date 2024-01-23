import { NotFoundException } from '@nestjs/common';

export class RateNotfoundException extends NotFoundException {
  constructor() {
    super('Rate not found');
  }
}
