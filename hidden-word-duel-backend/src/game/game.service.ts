// src/game/game.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { GuessService } from '../guess/guess.service';
import { Round, RoundStatusType } from '../round/entities/round.entity'; // Import RoundStatusType
import { RoundService } from '../round/round.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

export const GameEvent = {
  TILE_REVEALED: 'game.tile.revealed',
  ROUND_END: 'game.round.end',
};

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);
  private tickIntervals: Map<string, NodeJS.Timeout> = new Map();
  private tickDuration = 5000;
  private activeRounds: Map<string, { tick: number; revealedIndices: number[]; word: string; completed: boolean; wordAsArray: string[] }> = new Map();

  constructor(
    private readonly roundService: RoundService,
    private readonly guessService: GuessService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async startRound(round: Round): Promise<void> {
    const roundId = round.id;
    this.logger.log(`Starting round: ${roundId} with word: ${round.word}`);
    if (this.tickIntervals.has(roundId)) {
      clearInterval(this.tickIntervals.get(roundId)!);
      this.tickIntervals.delete(roundId);
    }
    let initialRevealedIndices: number[];
    if (Array.isArray(round.revealedTiles) && (round.revealedTiles.length === 0 || typeof round.revealedTiles[0] === 'number')) {
        initialRevealedIndices = [...round.revealedTiles];
    } else {
        this.logger.warn(`Round ${roundId} revealedTiles is not in number[] format. Initializing to empty. Received:`, round.revealedTiles);
        initialRevealedIndices = [];
    }
    this.activeRounds.set(roundId, {
      tick: 0,
      revealedIndices: initialRevealedIndices,
      word: round.word,
      wordAsArray: round.word.split(''),
      completed: false,
    });
    const intervalId = setInterval(async () => {
      await this.processTick(roundId);
    }, this.tickDuration);
    this.tickIntervals.set(roundId, intervalId);
  }

  async processTick(roundId: string): Promise<void> {
    const roundState = this.activeRounds.get(roundId);
    if (!roundState || roundState.completed) {
      if (this.tickIntervals.has(roundId)) {
        clearInterval(this.tickIntervals.get(roundId)!);
        this.tickIntervals.delete(roundId);
      }
      return;
    }
    const { wordAsArray, revealedIndices } = roundState;
    const unrevealedTrueIndices: number[] = [];
    for (let i = 0; i < wordAsArray.length; i++) {
      if (!revealedIndices.includes(i)) {
        unrevealedTrueIndices.push(i);
      }
    }
    if (unrevealedTrueIndices.length === 0) {
      this.logger.log(`Word fully revealed for round ${roundId} during processTick. Ending round.`);
      await this.endRound(roundId, null);
      return;
    }
    const randomUnrevealedIndex = unrevealedTrueIndices[Math.floor(Math.random() * unrevealedTrueIndices.length)];
    revealedIndices.push(randomUnrevealedIndex);
    revealedIndices.sort((a,b) => a-b);
    this.eventEmitter.emit(GameEvent.TILE_REVEALED, {
      roundId,
      position: randomUnrevealedIndex,
      letter: wordAsArray[randomUnrevealedIndex],
    });
    roundState.tick += 1;
    await this.roundService.updateRevealedTiles(roundId, [...revealedIndices]);
  }

  async revealTile(roundId: string, position: number): Promise<void> {
    this.logger.log(`Attempting manual reveal for tile at pos ${position}, round ${roundId}`);
    const round = await this.roundService.findById(roundId);
    if (!round) {
      this.logger.warn(`revealTile: Round ${roundId} not found.`);
      return;
    }
    if (round.status !== ('active' as RoundStatusType)) {
        this.logger.warn(`revealTile: Round ${roundId} is not active (status: ${round.status}).`);
        return;
    }
    if (position < 0 || position >= round.word.length) {
        this.logger.warn(`revealTile: Invalid position ${position} for round ${roundId}.`);
        return;
    }
    if (!Array.isArray(round.revealedTiles)) {
        this.logger.error(`revealTile: Round ${roundId} revealedTiles from DB is not an array.`);
        return;
    }
    if (round.revealedTiles.includes(position)) {
      this.logger.warn(`Tile at position ${position} for round ${roundId} is already revealed.`);
      return;
    }
    const newRevealedIndices = [...round.revealedTiles, position];
    newRevealedIndices.sort((a,b) => a-b);
    await this.roundService.updateRevealedTiles(roundId, newRevealedIndices);
    this.eventEmitter.emit(GameEvent.TILE_REVEALED, {
      roundId, position, letter: round.word[position],
    });
    this.logger.log(`Tile revealed (manual) and ${GameEvent.TILE_REVEALED} emitted for round ${roundId}, pos ${position}`);
  }

  async endRound(roundId: string, winnerId: string | null): Promise<void> {
    this.logger.log(`Attempting to end round: ${roundId}, Winner: ${winnerId}`);
    if (this.tickIntervals.has(roundId)) {
      clearInterval(this.tickIntervals.get(roundId)!);
      this.tickIntervals.delete(roundId);
      this.logger.log(`Cleared tick interval for round: ${roundId}`);
    }
    const roundState = this.activeRounds.get(roundId);
    if (roundState) {
      if (roundState.completed) {
        this.logger.warn(`Round ${roundId} is already marked as completed in activeRounds.`);
        return;
      }
      roundState.completed = true;
      this.logger.log(`Marked active round state as completed for: ${roundId}`);
    } else {
      this.logger.warn(`No active round state found in memory for ${roundId} during endRound.`);
    }
    const round = await this.roundService.findById(roundId);
    if (!round) {
      this.logger.error(`Round ${roundId} not found in DB when trying to end it.`);
      this.eventEmitter.emit(GameEvent.ROUND_END, {
        roundId, winnerId, word: null, error: 'Round not found in DB',
      });
      return;
    }
    const endedStatuses: RoundStatusType[] = ['ended', 'completed'];
    if (endedStatuses.includes(round.status)) {
        this.logger.warn(`Round ${roundId} is already marked as ${round.status} in DB.`);
        if (!roundState || !roundState.completed) {
             this.eventEmitter.emit(GameEvent.ROUND_END, {
                roundId, winnerId: round.winnerId, word: round.word,
            });
        }
        return;
    }
    const revealedWord = round.word;
    try {
      await this.roundService.endRound(roundId, winnerId);
      this.logger.log(`Successfully updated round status to ended in DB for: ${roundId}`);
    } catch (error) {
      this.logger.error(`Error updating round status in DB for ${roundId}: ${error.message}`);
    }
    this.eventEmitter.emit(GameEvent.ROUND_END, {
      roundId, winnerId, word: revealedWord,
    });
    this.logger.log(`Emitted ${GameEvent.ROUND_END} for round: ${roundId}`);
  }

  async isRoundActive(roundId: string): Promise<boolean> {
    const round = await this.roundService.findById(roundId);
    if (!round) {
      this.logger.warn(`isRoundActive: Round ${roundId} not found.`);
      return false;
    }
    return round.status === ('active' as RoundStatusType);
  }

  async getGameState(roundId: string): Promise<any | null> {
    const round = await this.roundService.findById(roundId);
    if (!round) {
      this.logger.error(`getGameState: Round ${roundId} not found.`);
      return null;
    }
    return {
      roundId: round.id,
      revealedIndices: round.revealedTiles,
      wordLength: round.word.length,
      status: round.status,
    };
  }
}