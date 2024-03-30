import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { RolePlayerEnum } from 'src/models/player.entity';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
    firstname: string;
    lastname: string;
    role: RolePlayerEnum;
}
