import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { RoundModule } from './round/round.module';
import { GuessModule } from './guess/guess.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
     EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or 'db' if you're using Docker
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Hidden word duel',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Safe only for development
    }),
    GameModule,
    MatchModule,
    PlayerModule,
    RoundModule,
    GuessModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
