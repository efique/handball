import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchDto } from './create-match.dto';
import { StatusEnum } from 'src/models/match.entity';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  versus: string;
  date: Date;
  score: string;
  isHome: boolean;
  status: StatusEnum;
  team_id: number;
}
