import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';
import { PlayerToTeam } from './playertoteam.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Match, (match) => match.team)
  matchs: Match[];

  @OneToMany(() => PlayerToTeam, (playerToTeam) => playerToTeam.team)
  public playerToTeams: PlayerToTeam[];
}
