import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Stat } from './stat.entity';
import { Team } from './team.entity';

export enum StatusEnum {
  NOTSTARTED = 'notstarted',
  INPROGRESS = 'inprogress',
  CLOSED = 'closed',
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  versus: string;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @Column()
  score: string;

  @Column()
  isHome: boolean;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.NOTSTARTED,
  })
  status: StatusEnum;

  @OneToMany(() => Stat, (stat) => stat.match)
  stats: Stat[];

  @ManyToOne(() => Team, (team) => team.matchs)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: Team;
}
