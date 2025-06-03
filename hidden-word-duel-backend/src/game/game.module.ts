// src/game/game.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // If your services use TypeORM entities

// Import Entities (adjust paths as needed)
import { Match } from '../match/entities/match.entity';
import { Round } from '../round/entities/round.entity';
import { Player } from '../player/entities/player.entity';
import { Guess } from '../guess/entities/guess.entity';
import { Game as GameEntity } from './entities/game.entity'; // Your Game entity if different from Match

// Import Services (adjust paths as needed)
import { GameService } from './game.service';
import { MatchService } from '../match/match.service';   // Assuming MatchService is in ../match
import { PlayerService } from '../player/player.service'; // Assuming PlayerService is in ../player
import { RoundService } from '../round/round.service';   // Assuming RoundService is in ../round
import { GuessService } from '../guess/guess.service';   // Assuming GuessService is in ../guess

// Import Gateway
import { GameGateway } from './game.gateway';
import { MatchModule } from '../match/match.module';

@Module({
  imports: [
  
    TypeOrmModule.forFeature([
      Match,      // If MatchService uses Match repository
      Round,      // If RoundService uses Round repository
      Player,     // If PlayerService uses Player repository
      Guess,      // If GuessService uses Guess repository
      GameEntity, // If GameService uses GameEntity repository (if 'Game' is not 'Match')
    ]),
    MatchModule,
 
  ],
  providers: [
    GameGateway,    // Your gateway
    GameService,
    MatchService,   // <--- PROVIDE MatchService HERE
    PlayerService,
    RoundService,
    GuessService,
  ],
  // If other modules need to use GameService, for example:
  // exports: [GameService]
})
export class GameModule {}