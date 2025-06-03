// src/match/entities/match.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Player } from '../../player/entities/player.entity';
import { Round } from '../../round/entities/round.entity';

// EXPORT the type
export type MatchStatusType = 'ongoing' | 'completed' | 'active' | 'waiting';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, { eager: false })
  player1: Player;
  // player1Id will be created by TypeORM

  @ManyToOne(() => Player, { eager: false })
  player2: Player;
  // player2Id will be created by TypeORM

  @Column({ default: 0 })
  score1: number;

  @Column({ default: 0 })
  score2: number;

  @Column({
    type: 'varchar',
    default: 'waiting',
  })
  status: MatchStatusType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, type: 'varchar' })
  winnerId: string | null;

  @OneToMany(() => Round, (round) => round.game) // Assuming round.game points back to this Match
  rounds: Round[];
}