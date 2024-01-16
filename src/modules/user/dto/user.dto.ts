import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto implements User {
  @Exclude()
  password: string;

  firstName: string;
  lastName: string;
  id: number;
  isAdmin: boolean;
  email: string;
}
