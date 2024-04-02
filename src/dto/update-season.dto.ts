import { PartialType } from '@nestjs/mapped-types';
import { CreateSeasonDto } from './create-season.dto';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {
  name : string
  victory : number
  draw : number
  lose : number
}
