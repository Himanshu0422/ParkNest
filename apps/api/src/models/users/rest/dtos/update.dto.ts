import { PartialType } from '@nestjs/swagger';
import { CreateUser } from './create.dto';
import { User } from '@prisma/client';

export class UpdateUser extends PartialType(CreateUser) {
  id: User['uid'];
}
