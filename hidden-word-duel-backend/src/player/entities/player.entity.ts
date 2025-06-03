import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ default: 0 })
  gamesWon: number;

  @Column({ default: 0 })
  gamesPlayed: number;
}
