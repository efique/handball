import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stat } from './stat.entity';
import { PlayerToTeam } from './playertoteam.entity';

export enum RolePlayerEnum {
  PLAYER = 'player',
  KEEPER = 'keeper',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    type: 'enum',
    enum: RolePlayerEnum,
    default: RolePlayerEnum.PLAYER,
  })
  role: RolePlayerEnum;

  @OneToMany(() => Stat, (stat) => stat.player)
  stats: Stat[];

  @OneToMany(() => PlayerToTeam, (playerToTeam) => playerToTeam.player)
  public playerToTeams: PlayerToTeam[];
}
