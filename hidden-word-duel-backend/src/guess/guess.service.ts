import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guess } from './entities/guess.entity';

@Injectable()
export class GuessService {
  constructor(
    @InjectRepository(Guess)
    private readonly guessRepository: Repository<Guess>
  ) {}

  async hasPlayerGuessed(roundId: string, playerId: string): Promise<boolean> {
    const guess = await this.guessRepository.findOne({
      where: { roundId, playerId }
    });
    return !!guess;
  }

  async saveGuess(roundId: string, playerId: string, guessText: string, isCorrect: boolean): Promise<Guess> {
    const guess = this.guessRepository.create({
      roundId,
      playerId,
      guessText,
      isCorrect
    });
    return await this.guessRepository.save(guess);
  }
}