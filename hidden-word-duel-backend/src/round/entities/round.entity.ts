// src/round/entities/round.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity'; // Assuming Game is your Match/Game concept

// EXPORT the type
export type RoundStatusType = 'active' | 'completed' | 'ended' | 'waiting';

@Entity()
export class Round {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game, (game) => game.rounds, { onDelete: 'CASCADE' })
  game: Game; // This implies a 'gameId' foreign key column will be created by TypeORM

  @Column() // This is the explicit foreign key column
  @Index()
  gameId: string;

  @Column()
  word: string;

  @Column('simple-array', { default: () => "'{}'"})
  revealedTiles: number[];

  @Column({
    type: 'varchar',
    default: 'active',
  })
  status: RoundStatusType;

  @Column({ nullable: true, type: 'varchar' })
  winnerId: string | null;

  @CreateDateColumn()
  createdAt: Date;
}