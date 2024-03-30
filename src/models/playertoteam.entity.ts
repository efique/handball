import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { Player } from './player.entity';
import { Season } from './season.entity';

@Entity()
export class PlayerToTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.playerToTeams)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: Team;

  @ManyToOne(() => Player, (player) => player.playerToTeams)
  @JoinColumn({ name: 'player_id', referencedColumnName: 'id' })
  player: Player;

  @ManyToOne(() => Season, (season) => season.playerToTeams)
  @JoinColumn({ name: 'season_id', referencedColumnName: 'id' })
  season: Season;
}
