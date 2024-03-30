import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Player } from './player.entity';
import { Match } from './match.entity';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  halftime: number;

  @Column()
  goal6m: number;

  @Column()
  goal9m: number;

  @Column()
  goal_pen: number;

  @Column()
  fault_off: number;

  @Column()
  bad_pass: number;

  @Column()
  bad_receipt: number;

  @Column()
  yellow_card: number;

  @Column()
  two_minute: number;

  @ManyToOne(() => Player, (player) => player.stats)
  @JoinColumn({ name: 'player_id', referencedColumnName: 'id' })
  player: Player;

  @ManyToOne(() => Match, (match) => match.stats)
  @JoinColumn({ name: 'match_id', referencedColumnName: 'id' })
  match: Match;
}
