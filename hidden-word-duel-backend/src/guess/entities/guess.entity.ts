// src/guess/entities/guess.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Guess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roundId: string;

  @Column()
  playerId: string;

  @Column()
  guessText: string;

  @Column()
  isCorrect: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
