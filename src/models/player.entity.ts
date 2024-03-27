import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum RolePlayerEnum {
  PLAYER = 'player',
  KEEPER = 'keeper',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: RolePlayerEnum, default: '' })
  role: RolePlayerEnum;
}
