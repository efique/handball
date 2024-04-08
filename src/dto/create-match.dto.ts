import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  versus: string;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  date: Date;

  score: string;

  @IsNumber()
  team_id: number;
}
