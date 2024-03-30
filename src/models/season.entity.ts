import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PlayerToTeam } from './playertoteam.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  victory: number;

  @Column()
  draw: number;

  @Column()
  lose: number;

  @OneToMany(() => PlayerToTeam, (playerToTeam) => playerToTeam.season)
  public playerToTeams: PlayerToTeam[];
}
