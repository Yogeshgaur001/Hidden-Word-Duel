// src/game/game.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameService, GameEvent } from './game.service';
import { MatchService } from '../match/match.service';
import { MatchStatusType } from '../match/entities/match.entity'; // Import MatchStatusType
import { PlayerService } from '../player/player.service';
import { RoundService } from '../round/round.service';
import { GuessService } from '../guess/guess.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(GameGateway.name);
  private playerRooms: Map<string, string> = new Map();

  constructor(
    private readonly gameService: GameService,
    private readonly matchService: MatchService,
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService,
    private readonly guessService: GuessService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    const playerId = client.handshake.auth.playerId;
    this.logger.log(`Client connected: ${client.id}, PlayerID from auth: ${playerId}`);
  }

  private getPlayerIdFromClient(client: Socket): string | undefined {
     return client.data?.playerId || client.handshake.auth.playerId;
  }

  private getRoomByPlayer(playerId: string): string | undefined {
    return this.playerRooms.get(playerId);
  }

  private isPlayerReconnected(playerId: string): boolean {
    for (const [_socketId, socket] of this.server.sockets.sockets) {
        if (this.getPlayerIdFromClient(socket) === playerId) {
            return true;
        }
    }
    return false;
  }

  private async getOpponent(playerId: string, roomId: string): Promise<string | null> {
    this.logger.log(`Finding opponent for ${playerId} in room ${roomId}`);
     const clientsInRoom = this.server.sockets.adapter.rooms.get(roomId);
     if (clientsInRoom) {
         for (const clientId of clientsInRoom) {
             const socketInRoom = this.server.sockets.sockets.get(clientId);
             if (socketInRoom) {
                 const opponentPlayerId = this.getPlayerIdFromClient(socketInRoom);
                 if (opponentPlayerId && opponentPlayerId !== playerId) {
                     return opponentPlayerId;
                 }
             }
         }
     }
    this.logger.warn(`Could not find opponent for player ${playerId} in room ${roomId}`);
    return null;
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('joinGame')
  async handleJoinGame(
    @MessageBody() data: { playerId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const explicitPlayerId = data.playerId;
    const authPlayerId = client.handshake.auth.playerId;
    const playerId = explicitPlayerId || authPlayerId;

    if (!playerId) {
      this.logger.error(`joinGame: Player ID missing for client ${client.id}.`);
      client.emit('error', { message: 'Player ID is required.' });
      return;
    }
    client.data.playerId = playerId;
    client.handshake.auth.playerId = playerId;

    this.logger.log(`Player ${playerId} (Socket: ${client.id}) attempting to join/create game.`);
    try {
      const match = await this.matchService.findOrCreateMatch(playerId);

      if (!match || !match.id) {
        this.logger.error(`MatchService did not return a valid match object for player ${playerId}`);
        client.emit('error', { message: 'Could not join or create a match.' });
        return;
      }

      const roomId = match.id;
      client.join(roomId);
      this.playerRooms.set(playerId, roomId);
      this.logger.log(`Player ${playerId} joined room ${roomId}. Match status: ${match.status}`);

      if (match.status === ('active' as MatchStatusType) && match.player1?.id && match.player2?.id) {
        this.server.to(roomId).emit('gameStart', { matchId: match.id });
        const firstRound = await this.roundService.createRoundForMatch(match.id, "YOUR_INITIAL_WORD"); // TODO: Get word from somewhere
        if (firstRound) {
            await this.gameService.startRound(firstRound);
        } else {
            this.logger.error(`Could not create first round for match ${match.id}`);
            this.server.to(roomId).emit('error', {message: 'Failed to start the game round.'});
        }
      } else if (match.status === ('waiting' as MatchStatusType)) {
        client.emit('waiting', { matchId: match.id, message: 'Waiting for another player.' });
        this.server.to(roomId).emit('playerJoinedWaiting', { playerId, matchId: match.id });
      } else {
         this.logger.warn(`Match ${match.id} has an unexpected status: ${match.status}`);
         client.emit('matchStatus', { matchId: match.id, status: match.status });
      }
    } catch (error) {
      this.logger.error(`Error in handleJoinGame for player ${playerId}: ${error.message}`, error.stack);
      client.emit('error', { message: 'Server error while joining game.' });
    }
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('submitGuess')
  async handleGuess(
    @MessageBody() data: { roundId: string; guessText: string },
    @ConnectedSocket() client: Socket,
  ) {
    const playerId = this.getPlayerIdFromClient(client);
    if (!playerId) {
      return client.emit('error', { message: 'Authentication error.' });
    }
    const { roundId, guessText } = data;
    if (!roundId || typeof guessText !== 'string') {
        return client.emit('error', {message: 'Invalid guess data.'});
    }
    this.logger.log(`Player ${playerId} submitted guess "${guessText}" for round ${roundId}`);

    const isActive = await this.gameService.isRoundActive(roundId);
    if (!isActive) {
      return client.emit('error', { message: 'This round is not active or has ended.' });
    }

    const alreadyGuessedInRound = await this.guessService.hasPlayerGuessed(roundId, playerId);
    if (alreadyGuessedInRound) {
      return client.emit('error', { message: 'You have already submitted a guess for this round.' });
    }

    const round = await this.roundService.findById(roundId);
    if (!round) {
        return client.emit('error', { message: 'Round not found.' });
    }

    const isCorrect = guessText.toLowerCase() === round.word.toLowerCase();
    await this.guessService.saveGuess(roundId, playerId, guessText, isCorrect);
    client.emit('guessResult', { roundId, guessText, isCorrect });

    if (isCorrect) {
      this.logger.log(`Player ${playerId} guessed correctly. Ending round ${roundId}.`);
      await this.gameService.endRound(roundId, playerId);
    }
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('revealTile')
  async handleRevealTileRequest(
    @MessageBody() data: { roundId: string; position: number },
    @ConnectedSocket() client: Socket,
  ) {
    const playerId = this.getPlayerIdFromClient(client);
    if (!playerId) {
      return client.emit('error', { message: 'Authentication error.' });
    }
    this.logger.log(`Player ${playerId} requested reveal for tile ${data.position} in round ${data.roundId}`);
    await this.gameService.revealTile(data.roundId, data.position);
  }

  @OnEvent(GameEvent.TILE_REVEALED)
  handleTileRevealedEvent(payload: { roundId: string; position: number; letter: string }) {
    this.logger.log(`Event ${GameEvent.TILE_REVEALED} received: R:${payload.roundId} P:${payload.position} L:${payload.letter}`);
    this.server.to(payload.roundId).emit('tileRevealed', {
      roundId: payload.roundId, position: payload.position, letter: payload.letter,
    });
  }

  @OnEvent(GameEvent.ROUND_END)
  handleRoundEndEvent(payload: { roundId: string; winnerId: string | null; word: string; error?: string }) {
    this.logger.log(`Event ${GameEvent.ROUND_END} received: R:${payload.roundId} W:${payload.winnerId} E:${payload.error}`);
    if (payload.error) {
        this.server.to(payload.roundId).emit('roundError', { roundId: payload.roundId, message: payload.error });
    } else {
        this.server.to(payload.roundId).emit('roundEnd', {
          roundId: payload.roundId, winnerId: payload.winnerId, word: payload.word,
        });
    }
  }

  @SubscribeMessage('getGameState')
  async handleGetGameState(
    @MessageBody() data: { roundId: string },
    @ConnectedSocket() client: Socket
  ) {
    const playerId = this.getPlayerIdFromClient(client);
    if (!playerId) return client.emit('error', { message: 'Authentication error.'});
    const gameState = await this.gameService.getGameState(data.roundId);
    if (gameState) {
        client.emit('gameState', gameState);
    } else {
        client.emit('error', {message: `Game state for round ${data.roundId} not found.`})
    }
  }

  async handleDisconnect(client: Socket) {
    const playerId = this.getPlayerIdFromClient(client);
    if (!playerId) {
      this.logger.log(`Client ${client.id} disconnected without an associated playerId.`);
      return;
    }
    const roomId = this.getRoomByPlayer(playerId); // roomId is matchId
    this.playerRooms.delete(playerId);
    this.logger.log(`Player ${playerId} (Socket: ${client.id}) disconnected from match ${roomId || 'N/A'}.`);

    if (roomId) {
      this.server.to(roomId).emit('playerDisconnected', { playerId, matchId: roomId });
      setTimeout(async () => {
        if (!this.isPlayerReconnected(playerId)) {
          this.logger.log(`Grace period ended for ${playerId} in match ${roomId}. Not reconnected.`);
          const currentRound = await this.roundService.getCurrentRoundForMatch(roomId); // Pass matchId(roomId)

          if (currentRound && await this.gameService.isRoundActive(currentRound.id)) {
            const opponentId = await this.getOpponent(playerId, roomId);
            this.logger.log(`Ending round ${currentRound.id} due to ${playerId} disconnect. Opponent ${opponentId || 'N/A'} wins.`);
            await this.gameService.endRound(currentRound.id, opponentId);
          } else {
            this.logger.log(`No active round for match ${roomId} or round already ended, or getCurrentRoundForMatch failed after ${playerId} disconnect.`);
            // TODO: Consider ending the match itself if a player disconnects from an active match and doesn't return.
            // const match = await this.matchService.findById(roomId);
            // if (match && match.status === 'active') {
            //   // Update match status, declare winner, etc.
            // }
          }
        } else {
          this.logger.log(`Player ${playerId} reconnected or match ${roomId} no longer requires disconnect logic.`);
        }
      }, 15000);
    }
  }
}