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

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  versus: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  score: string;

  @OneToMany(() => Stat, (stat) => stat.match)
  stats: Stat[];

  @ManyToOne(() => Team, (team) => team.matchs)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: Team;
}
