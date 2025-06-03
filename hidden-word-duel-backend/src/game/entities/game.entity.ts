import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Round } from '../../round/entities/round.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  player1Id: string;

  @Column()
  player2Id: string;

  @Column({ default: 0 })
  player1Score: number;

  @Column({ default: 0 })
  player2Score: number;

  @Column({ default: 'active' })
  status: 'active' | 'completed';

  @OneToMany(() => Round, round => round.game)
  rounds: Round[];
}