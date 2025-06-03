// src/match/match.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match, MatchStatusType } from './entities/match.entity'; // Import corrected MatchStatusType
import { Player } from '../player/entities/player.entity';
// Assuming RoundService and GameService are needed for starting rounds, etc.
// import { RoundService } from '../round/round.service';
// import { GameService } from '../game/game.service';


interface WaitingPlayer {
  id: string;
}

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);
  private waitingPlayers: Map<string, WaitingPlayer> = new Map();

  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    // private readonly roundService: RoundService, // Inject if creating rounds here
    // private readonly gameService: GameService,   // Inject if starting rounds here
  ) {}

  async findOrCreateMatch(playerId: string): Promise<Match> {
    this.logger.log(`Player ${playerId} looking for a match.`);
    if (this.waitingPlayers.size > 0) {
      for (const [waitingPlayerId, _waitingPlayerObject] of this.waitingPlayers.entries()) {
        if (waitingPlayerId !== playerId) {
          this.logger.log(`Found waiting player ${waitingPlayerId}, pairing with ${playerId}.`);
          this.waitingPlayers.delete(waitingPlayerId); // Remove the found waiting player
          // Find the match created for waitingPlayerId and update it
          let matchToUpdate = await this.matchRepository.findOne({
            where: { player1: { id: waitingPlayerId }, status: 'waiting' as MatchStatusType }
          });
          if (matchToUpdate) {
            matchToUpdate.player2 = { id: playerId } as Player;
            matchToUpdate.status = 'active' as MatchStatusType;
            return this.matchRepository.save(matchToUpdate);
          } else {
            // Fallback: if the waiting match wasn't found (e.g. server restart, map cleared), create new
            this.logger.warn(`Waiting match for ${waitingPlayerId} not found. Creating new active match.`);
            return this.createActiveMatch(waitingPlayerId, playerId);
          }
        }
      }
    }

    // No suitable waiting player, or current player was the only one waiting. Add to waiting list.
    this.logger.log(`No waiting player found or only self was waiting. Adding ${playerId} to the waiting list.`);
    this.waitingPlayers.set(playerId, { id: playerId });

    // Create and save a match entity with 'waiting' status for this player
    const newMatch = this.matchRepository.create({
        player1: { id: playerId } as Player,
        status: 'waiting' as MatchStatusType,
    });
    const savedWaitingMatch = await this.matchRepository.save(newMatch);
    this.logger.log(`Created waiting match ${savedWaitingMatch.id} for player ${playerId}`);
    return savedWaitingMatch;
  }

  // Helper to create a new active match directly (used as fallback or if direct creation needed)
  private async createActiveMatch(player1Id: string, player2Id: string): Promise<Match> {
    const matchToStart = this.matchRepository.create({
      player1: { id: player1Id } as Player,
      player2: { id: player2Id } as Player,
      status: 'active' as MatchStatusType,
      score1: 0,
      score2: 0,
    });
    const savedMatch = await this.matchRepository.save(matchToStart);
    this.logger.log(`Match ${savedMatch.id} is now active between ${player1Id} and ${player2Id}.`);
    // TODO: Create and start the first round here
    // const firstRound = await this.roundService.createRoundForMatch(savedMatch.id, "YOUR_FIRST_WORD_HERE");
    // await this.gameService.startRound(firstRound);
    return savedMatch;
  }


  async findById(matchId: string): Promise<Match | null> {
    return this.matchRepository.findOne({ where: { id: matchId }, relations: ['player1', 'player2', 'rounds'] });
  }
}