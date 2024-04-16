import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlayerToTeamDto {
  @IsNumber()
  @IsNotEmpty()
  player_id: number;

  @IsNumber()
  @IsNotEmpty()
  team_id: number;

  @IsNumber()
  @IsNotEmpty()
  season_id: number;
}
