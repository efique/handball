import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusEnum } from 'src/models/match.entity';

export class CreateMatchDto {
  @IsNotEmpty()
  versus: string;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  date: Date;

  score: string;

  @IsNotEmpty()
  isHome: boolean;

  @IsNotEmpty()
  status: StatusEnum;

  @IsNumber()
  team_id: number;
}
