import { IsNotEmpty } from 'class-validator';
import { isUnique } from 'src/decorators/isuniquedecorator';
import { RoleAppEnum } from 'src/models/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @isUnique({ tableName: 'user', column: 'username' })
  username: string;

  @IsNotEmpty()
  password: string;

  role: RoleAppEnum;
}
