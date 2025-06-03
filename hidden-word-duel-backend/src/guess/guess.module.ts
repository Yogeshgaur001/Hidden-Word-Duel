import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuessService } from './guess.service';
import { Guess } from './entities/guess.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guess])],
  providers: [GuessService],
  exports: [GuessService]
})
export class GuessModule {}
