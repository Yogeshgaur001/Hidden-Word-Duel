import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from '../player/dto/create-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('/register')
  async register(@Body() dto: CreatePlayerDto) {
    return this.playerService.register(dto);
  }

  @Get('/:id')
  async getPlayer(@Param('id') id: string) {
    return this.playerService.findById(id);
  }
}
