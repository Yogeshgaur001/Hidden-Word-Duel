// src/round/round.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Round, RoundStatusType } from './entities/round.entity'; // Import corrected RoundStatusType

@Injectable()
export class RoundService {
  private readonly logger = new Logger(RoundService.name);

  constructor(
    @InjectRepository(Round)
    private readonly roundRepository: Repository<Round>,
  ) {}

  async findById(id: string): Promise<Round | null> {
    const round = await this.roundRepository.findOne({ where: { id } });
    return round || null;
  }

  async updateRevealedTiles(roundId: string, revealedIndices: number[]): Promise<void> {
    const round = await this.findById(roundId);
    if (!round) {
        this.logger.warn(`Cannot update revealed tiles: Round ${roundId} not found.`);
        return;
    }
    round.revealedTiles = [...new Set(revealedIndices)].sort((a, b) => a - b);
    await this.roundRepository.save(round);
  }

  async endRound(roundId: string, winnerId: string | null): Promise<void> {
    const round = await this.findById(roundId);
    if (!round) {
        this.logger.warn(`Cannot end round: Round ${roundId} not found.`);
        return;
    }
    // Ensure you have 'completed' or 'ended' in your RoundStatusType
    round.status = 'completed' as RoundStatusType;
    round.winnerId = winnerId;
    await this.roundRepository.save(round);
    this.logger.log(`Round ${roundId} ended. Winner: ${winnerId || 'None'}.`);
  }

  async revealTile(roundId: string, position: number): Promise<void> {
    const round = await this.findById(roundId);
    if (!round) {
        this.logger.warn(`Cannot reveal tile: Round ${roundId} not found.`);
        return;
    }
    if (position < 0 || position >= round.word.length) {
      this.logger.error(`Invalid tile position ${position} for round ${roundId}.`);
      return;
    }
    if (!round.revealedTiles.includes(position)) {
      round.revealedTiles.push(position);
      round.revealedTiles.sort((a,b) => a-b);
      await this.roundRepository.save(round);
    } else {
        this.logger.log(`Tile at position ${position} for round ${roundId} already revealed.`);
    }
  }

  async getCurrentRoundForMatch(matchGameId: string): Promise<Round | null> {
    this.logger.log(`Attempting to find current round for match/game ${matchGameId}`);
    const ongoingStatuses: RoundStatusType[] = ['active', 'waiting'];
    return this.roundRepository.findOne({
      where: {
        gameId: matchGameId, // Use gameId (the actual foreign key column)
        status: In(ongoingStatuses),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async createRoundForMatch(matchGameId: string, word: string, initialRevealedTiles: number[] = []): Promise<Round> {
    const newRoundData: Partial<Round> = {
      gameId: matchGameId, // Use gameId
      word,
      revealedTiles: initialRevealedTiles,
      status: 'active' as RoundStatusType,
      winnerId: null,
    };
    const newRoundEntity = this.roundRepository.create(newRoundData);
    return this.roundRepository.save(newRoundEntity);
  }
}