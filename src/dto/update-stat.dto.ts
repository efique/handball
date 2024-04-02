import { PartialType } from '@nestjs/mapped-types';
import { CreateStatDto } from './create-stat.dto';

export class UpdateStatDto extends PartialType(CreateStatDto) {
  half_time : number
  goal6m : number
  goal9m : number
  goal_pen : number
  fault_off : number
  bad_pass : number
  bad_receipt : number
  yellow_card : number
  two_minute : number
}
