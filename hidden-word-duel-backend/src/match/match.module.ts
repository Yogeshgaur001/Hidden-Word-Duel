// src/match/match.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';
// Potentially import PlayerModule if MatchService depends on Player entity/service from it

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchService],
  exports: [MatchService], // <--- EXPORT MatchService
})
export class MatchModule {}