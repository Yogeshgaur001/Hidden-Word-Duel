'use client';

import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';
import { GameState, RevealedLetter } from '@/types';

type Action =
  | { type: 'CONNECTING' }
  | { type: 'CONNECTED_TO_LOBBY' }
  | { type: 'WAITING_FOR_OPPONENT' }
  | { type: 'START_ROUND'; payload: import('@/types').StartRoundPayload }
  | { type: 'TICK_START'; payload: import('@/types').TickStartPayload }
  | { type: 'REVEAL_TILE'; payload: import('@/types').RevealTilePayload }
  | { type: 'SUBMIT_GUESS_ATTEMPT' }
  | { type: 'GUESS_SUBMITTED' }
  | { type: 'ROUND_END'; payload: import('@/types').RoundEndPayload }
  | { type: 'MATCH_END'; payload: import('@/types').MatchEndPayload }
  | { type: 'SET_NOTIFICATION'; payload: GameState['notification'] }
  | { type: 'CLEAR_NOTIFICATION' }
  | { type: 'UPDATE_TIMER'; payload: number }
  | { type: 'OPPONENT_DISCONNECTED'; payload: import('@/types').OpponentDisconnectedPayload };


const initialRevealedWord = (length: number): RevealedLetter[] =>
  Array(length).fill(null).map(() => ({ letter: null, isRevealed: false }));

const initialState: GameState = {
  roundId: null,
  wordLength: 0,
  revealedWord: [],
  players: [],
  currentPlayerId: null,
  opponentPlayerId: null,
  currentRound: 0,
  totalRounds: 5, // Example
  timeLeftInTick: 0,
  isTickActive: false,
  gameStatus: 'lobby',
  roundWinner: null,
  matchWinner: null,
  lastRevealedWord: null,
  guessSubmittedThisTick: false,
  notification: null,
};

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<Action> } | undefined>(undefined);

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'CONNECTING':
      return { ...state, gameStatus: 'lobby', notification: { type: 'info', message: 'Connecting to server...' } };
    case 'CONNECTED_TO_LOBBY':
      return { ...state, gameStatus: 'lobby', notification: { type: 'info', message: 'Connected! Waiting for lobby...' } };
    case 'WAITING_FOR_OPPONENT':
      return { ...state, gameStatus: 'waiting', notification: { type: 'info', message: 'Waiting for an opponent...' } };
    case 'START_ROUND': {
      const { roundId, wordLength, roundNumber, player1, player2, currentPlayerId } = action.payload;
      // Determine who is the opponent
      const opponent = currentPlayerId === player1.id ? player2 : player1;
      return {
        ...initialState, // Reset most things for new round
        gameStatus: 'playing',
        roundId,
        wordLength,
        revealedWord: initialRevealedWord(wordLength),
        currentRound: roundNumber,
        players: [player1, player2],
        currentPlayerId: currentPlayerId,
        opponentPlayerId: opponent.id,
        notification: { type: 'info', message: `Round ${roundNumber} starting! Guess the ${wordLength}-letter word.` },
      };
    }
    case 'TICK_START':
      return {
        ...state,
        isTickActive: true,
        timeLeftInTick: action.payload.tickDuration / 1000, // Convert ms to s
        guessSubmittedThisTick: false,
        notification: { type: 'info', message: 'New tick! Make your guess.' },
      };
    case 'REVEAL_TILE': {
      const newRevealedWord = [...state.revealedWord];
      newRevealedWord[action.payload.index] = { letter: action.payload.letter, isRevealed: true };
      return { ...state, revealedWord: newRevealedWord, isTickActive: false };
    }
    case 'SUBMIT_GUESS_ATTEMPT':
      return { ...state, guessSubmittedThisTick: true };
    case 'GUESS_SUBMITTED': // Optional: could be used for UI feedback
      return { ...state, notification: { type: 'info', message: 'Guess submitted!' } };
    case 'ROUND_END': {
      const { winner, revealedWord, player1Score, player2Score } = action.payload;
      const updatedPlayers = state.players.map(p =>
        p.id === state.players[0].id ? { ...p, score: player1Score } : { ...p, score: player2Score }
      );
      let message = `Round over! The word was: ${revealedWord}. `;
      if (winner === 'draw') message += "It's a draw!";
      else if (winner) {
        const winnerPlayer = updatedPlayers.find(p => p.id === winner);
        message += `${winnerPlayer?.username || 'Player'} won the round!`;
      } else message += "No one guessed it right.";

      return {
        ...state,
        gameStatus: 'roundOver',
        roundWinner: winner,
        lastRevealedWord: revealedWord,
        players: updatedPlayers,
        isTickActive: false,
        notification: { type: 'success', message },
      };
    }
    case 'MATCH_END': {
      const { winner, finalScores } = action.payload;
      const updatedPlayers = state.players.map(p =>
        p.id === state.players[0].id ? { ...p, score: finalScores.player1 } : { ...p, score: finalScores.player2 }
      );
      let message = "Match Over! ";
      if (winner === 'draw') message += "It's a draw!";
      else if (winner) {
        const winnerPlayer = updatedPlayers.find(p => p.id === winner);
        message += `${winnerPlayer?.username || 'Player'} won the match!`;
      }

      return {
        ...state,
        gameStatus: 'matchOver',
        matchWinner: winner,
        players: updatedPlayers,
        isTickActive: false,
        notification: { type: 'success', message },
      };
    }
    case 'UPDATE_TIMER':
      return { ...state, timeLeftInTick: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    case 'OPPONENT_DISCONNECTED':
        return {
            ...state,
            gameStatus: 'matchOver', // Or a specific 'opponentDisconnected' status
            matchWinner: state.currentPlayerId, // Award win to current player
            notification: { type: 'error', message: action.payload.message },
        };
    default:
      return state;
  }
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};