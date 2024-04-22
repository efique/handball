import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { RoleAppEnum } from 'src/models/user.entity';
import { isUnique } from 'src/decorators/isuniquedecorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @isUnique({ tableName: 'user', column: 'username' })
  username: string;

  password: string;
  role: RoleAppEnum;
}
